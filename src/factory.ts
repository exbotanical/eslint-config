import { isPackageExists } from 'local-pkg'

import {
  CommentsConfig,
  DisablesConfig,
  IgnoresConfig,
  ImportsConfig,
  JavascriptConfig,
  JsdocConfig,
  jsonc,
  jsx,
  markdown,
  node,
  PerfectionistConfig,
  prettier,
  react,
  regexpr,
  test,
  toml,
  UnicornConfig,
  vue,
  yaml,
  GraphqlConfig,
  TypescriptConfig,
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
    new PerfectionistConfig().rules(),
    new UnicornConfig().rules(),
    new CommentsConfig().rules(),
    new ImportsConfig().rules(),
    new JavascriptConfig({ ...optionsJavascript, type }).rules(),
    new JsdocConfig().rules(),
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
    configs.push(new GraphqlConfig().rules())
  }

  if (optionsReact) {
    configs.push(react({ ...factoryConfig(optionsReact) }))
  }

  if (optionsToml) {
    configs.push(toml({ ...factoryConfig(optionsToml), ...optionsStyle }))
  }

  if (optionsTypescript) {
    configs.push(
      new TypescriptConfig({ ...factoryConfig(optionsTypescript), type }).rules(),
    )
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

  configs.push(
    new DisablesConfig().rules(),
    new IgnoresConfig({ files: optionsIgnore }).rules(),
  )

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
