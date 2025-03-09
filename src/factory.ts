import { isPackageExists } from 'local-pkg'

import {
  comments,
  disables,
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
  react,
  regexpr,
  test,
  toml,
  typescript,
  unicorn,
  vue,
  yaml,
} from './configs'
import { packageJson } from './configs/package.json'
import { tsconfig } from './configs/tsconfig'
import { STYLE_DEFAULTS } from './defaults'

import type { OptionsConfig } from './options'
import type { FlatConfigRecord } from './types'

type LinterOptions = OptionsConfig

export async function exbotanical({
  javascript: optionsJavascript,
  ignores: optionsIgnore,
  jsonc: optionsJsonc = true,
  markdown: optionsMarkdown = true,
  toml: optionsToml = true,
  yaml: optionsYaml = true,
  test: optionsTest = true,
  formatter = true,
  typescript: optionsTypescript = isPackageExists('typescript'),
  style: optionsStyle = STYLE_DEFAULTS,
  react: optionsReact,
  vue: optionsVue,

  ...otherOptions
}: LinterOptions): Promise<FlatConfigRecord[]> {
  const configs = [
    perfectionist(),
    unicorn(),
    comments(),
    imports(),
    javascript({ ...optionsJavascript, ...otherOptions }),
    jsdoc(),
    jsx(),
    node(),
    regexpr(),
    test({ ...factoryConfig(optionsTest), ...otherOptions }),
  ]

  if (optionsJsonc) {
    configs.push(
      packageJson(),
      tsconfig(),
      jsonc({
        ...factoryConfig(optionsJsonc),
        ...optionsStyle,
        ...otherOptions,
      }),
    )
  }

  if (optionsMarkdown) {
    configs.push(
      markdown({ ...factoryConfig(optionsMarkdown), ...otherOptions }),
    )
  }

  if (optionsReact) {
    configs.push(react({ ...factoryConfig(optionsReact), ...otherOptions }))
  }

  if (optionsToml) {
    configs.push(
      toml({ ...factoryConfig(optionsToml), ...optionsStyle, ...otherOptions }),
    )
  }

  if (optionsTypescript) {
    configs.push(
      typescript({ ...factoryConfig(optionsTypescript), ...otherOptions }),
    )
  }

  if (optionsVue) {
    configs.push(vue({ ...factoryConfig(optionsVue), ...otherOptions }))
  }

  if (optionsYaml) {
    configs.push(
      yaml({ ...factoryConfig(optionsYaml), ...optionsStyle, ...otherOptions }),
    )
  }

  if (formatter) {
    configs.push(prettier())
  }

  configs.push(disables(), ignores({ ...optionsIgnore, ...otherOptions }))

  const resolved = await Promise.all(configs)

  return resolved.flat()
}

function factoryConfig<T>(options: T | boolean): T {
  if (!options) return {} as T
  return (typeof options === 'boolean' ? {} : options) as T
}

// TODO: @graphql-eslint/eslint-plugin
