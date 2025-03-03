import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { OptionsConfig } from '../src/types'
import { afterAll, beforeAll, it } from 'vitest'

const TEST_DIR = 'test/fixtures.tmp'

beforeAll(async () => {
  await fs.rm(TEST_DIR, { recursive: true, force: true })
})
afterAll(async () => {
  // await fs.rm(TEST_DIR, { recursive: true, force: true })
})

execWithConfig('all', {
  format: {},
  markdown: true,
  jsonc: true,
  react: true,
  vue: true,
  yaml: true,
  typescript: true,
  toml: true,
  test: true,
})

async function execWithConfig(name: string, config: OptionsConfig) {
  it.concurrent(name, async ({ expect }) => {
    const src = path.resolve('test/fixtures/input')
    const output = path.resolve('test/fixtures/output', name)
    const dest = path.resolve(TEST_DIR, name)

    await fs.cp(src, dest, { recursive: true })
    await fs.writeFile(
      path.join(dest, 'eslint.config.ts'),
      `
// @eslint-disable
import exbotanical from '../../../src'
export default exbotanical(${JSON.stringify(config)})
`,
      {
        encoding: 'utf-8',
      },
    )

    try {
      const r = await promisify(exec)('eslint . --fix', {
        cwd: dest,
      })
      console.log({ out: r.stderr })
    } catch (e) {
      console.log({ out: e })
    }

    const files = await fs.readdir(dest)

    files.map(async file => {
      const content = await fs.readFile(path.join(dest, file), 'utf-8')
      // await expect.soft(content).toMatchFileSnapshot(path.join(output, file))
    })
  })
}
