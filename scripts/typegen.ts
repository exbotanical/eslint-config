import fs from 'node:fs/promises'

import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import exbotanical from 'src'

const configs = await exbotanical({
  markdown: true,
  jsonc: true,
  react: true,
  vue: true,
  yaml: true,
  typescript: true,
  toml: true,
  test: true,
  graphql: true,
})

const configNames = configs.map(({ name }) => name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(name => `'${name}'`).join(' | ')}
`

await fs.writeFile('../typegen.d.ts', dts)
