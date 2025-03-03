import { FlatConfigRecord } from './types'
import {
  comments,
  disables,
  format,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  markdown,
  node,
  perfectionist,
  prettier,
  toml,
  typescript,
  unicorn,
  yaml,
} from './configs'
import { packageJson } from './configs/package.json'
import { tsconfig } from './configs/tsconfig'
import type { OptionsConfig } from './types'

type LinterOptions = OptionsConfig

export async function exbotanical(
  options: LinterOptions = {
    jsonc: true,
    markdown: true,
    format: 'prettier',
  },
): Promise<FlatConfigRecord[]> {
  const configs = [
    javascript(options.javascript),
    perfectionist(),
    unicorn(),
    comments(),
    disables(),
    imports(),
    jsdoc(),
    jsx(),
    node(),
    ignores(options.ignores),
  ]

  if (options.typescript) {
    configs.push(typescript(factoryConfig(options.typescript)))
  }

  if (options.markdown) {
    configs.push(markdown(factoryConfig(options.markdown)))
  }

  if (options.toml) {
    configs.push(toml(factoryConfig(options.toml), options.style))
  }

  if (options.yaml) {
    configs.push(yaml(factoryConfig(options.yaml), options.style))
  }

  if (options.jsonc) {
    configs.push(
      packageJson(),
      tsconfig(),
      jsonc(factoryConfig(options.jsonc), options.style),
    )
  }

  // MUST be last
  if (options.format) {
    configs.push(
      options.format === 'prettier'
        ? prettier()
        : format(factoryConfig(options.format), options.style),
    )
  }

  return (await Promise.all(configs)).flat()
}

function factoryConfig<T>(options: T | boolean): T {
  if (!options) return {} as T
  return (typeof options === 'boolean' ? {} : options) as T
}

// TODO: @graphql-eslint/eslint-plugin
