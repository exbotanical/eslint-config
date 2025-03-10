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
  graphql,
} from './configs'
import { packageJson } from './configs/package.json'
import { tsconfig } from './configs/tsconfig'
import { STYLE_DEFAULTS } from './defaults'

import type { OptionsConfig } from './options'
import type { Awaitable, FlatConfigRecord } from './types'
import type { Linter } from 'eslint'

type LinterOptions = OptionsConfig

export async function exbotanical(
  {
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
    graphql: optionsGraphql,
    type,
  }: LinterOptions,
  ...userConfigs: Awaitable<FlatConfigRecord | FlatConfigRecord[] | Linter.Config[]>[]
): Promise<FlatConfigRecord[]> {
  const configs = [
    perfectionist(),
    unicorn(),
    comments(),
    imports(),
    javascript({ ...optionsJavascript, type }),
    jsdoc(),
    jsx(),
    node(),
    regexpr(),
    test({ ...factoryConfig(optionsTest) }),
  ]

  if (optionsJsonc) {
    configs.push(
      packageJson(),
      tsconfig(),
      jsonc({
        ...factoryConfig(optionsJsonc),
        ...optionsStyle,
      }),
    )
  }

  if (optionsMarkdown) {
    configs.push(markdown({ ...factoryConfig(optionsMarkdown) }))
  }

  if (optionsGraphql) {
    configs.push(graphql())
  }

  if (optionsReact) {
    configs.push(react({ ...factoryConfig(optionsReact) }))
  }

  if (optionsToml) {
    configs.push(toml({ ...factoryConfig(optionsToml), ...optionsStyle }))
  }

  if (optionsTypescript) {
    configs.push(typescript({ ...factoryConfig(optionsTypescript), type }))
  }

  if (optionsVue) {
    configs.push(vue({ ...factoryConfig(optionsVue), graphql: !!optionsGraphql }))
  }

  if (optionsYaml) {
    configs.push(yaml({ ...factoryConfig(optionsYaml), ...optionsStyle }))
  }

  if (formatter) {
    configs.push(prettier())
  }

  configs.push(disables(), ignores(optionsIgnore))

  if (userConfigs.length > 0) {
    const resolved = await Promise.all(userConfigs)
    configs.push(...resolved.map(r => Promise.resolve(Array.isArray(r) ? r : [r])))
  }

  const resolved = await Promise.all(configs)

  return resolved.flat()
}

function factoryConfig<T>(options: T | boolean): T {
  if (!options) return {} as T
  return (typeof options === 'boolean' ? {} : options) as T
}

// TODO: @graphql-eslint/eslint-plugin
