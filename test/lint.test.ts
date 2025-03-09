import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'

import { afterAll, beforeAll, it } from 'vitest'

import type { OptionsConfig } from '../src/options'

const TEST_DIR = 'test/fixtures.tmp'

beforeAll(async () => {
  await fs.rm(TEST_DIR, { recursive: true, force: true })
})
afterAll(async () => {
  await fs.rm(TEST_DIR, { recursive: true, force: true })
})

runWithConfig('all', {
  formatter: true,
  markdown: true,
  jsonc: true,
  react: true,
  vue: true,
  yaml: true,
  typescript: true,
  toml: true,
  test: true,
})

async function runWithConfig(name: string, config: OptionsConfig) {
  it.concurrent(name, async ({ expect }) => {
    const source = path.resolve('test/fixtures/input')
    const output = path.resolve('test/fixtures/output', name)
    const destination = path.resolve(TEST_DIR, name)

    await fs.cp(source, destination, { recursive: true })
    await fs.writeFile(
      path.join(destination, 'eslint.config.ts'),
      `
// @eslint-disable
import exbotanical from '../../../src'
export default exbotanical(${JSON.stringify(config)})
`,
      {
        encoding: 'utf8',
      },
    )

    try {
      await promisify(exec)('eslint . --fix', {
        cwd: destination,
      })
    } catch {}

    const files = await fs.readdir(destination)

    files.map(async file => {
      const content = await fs.readFile(path.join(destination, file), 'utf8')
      await expect.soft(content).toMatchFileSnapshot(path.join(output, file))
    })
  })
}
