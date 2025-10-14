import { isPackageExists } from 'local-pkg'

import {
  CommentsConfig,
  DisablesConfig,
  IgnoresConfig,
  ImportsConfig,
  JavascriptConfig,
  JsdocConfig,
  JsoncConfig,
  JsxConfig,
  MarkdownConfig,
  NodeConfig,
  PackageJsonConfig,
  PerfectionistConfig,
  PrettierConfig,
  ReactConfig,
  RegexprConfig,
  TestConfig,
  TomlConfig,
  TsconfigConfig,
  UnicornConfig,
  VueConfig,
  YamlConfig,
  GraphqlConfig,
  TypescriptConfig,
} from './configs'
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
    new JsxConfig().rules(),
    new NodeConfig().rules(),
    new RegexprConfig().rules(),
    new TestConfig({ ...factoryConfig(optionsTest) }).rules(),
  ]

  if (optionsJsonc) {
    configs.push(
      new PackageJsonConfig().rules(),
      new TsconfigConfig().rules(),
      new JsoncConfig({
        ...factoryConfig(optionsJsonc),
        ...optionsStyle,
      }).rules(),
    )
  }

  if (optionsMarkdown) {
    configs.push(new MarkdownConfig({ ...factoryConfig(optionsMarkdown) }).rules())
  }

  if (optionsGraphql) {
    configs.push(new GraphqlConfig().rules())
  }

  if (optionsReact) {
    configs.push(new ReactConfig({ ...factoryConfig(optionsReact) }).rules())
  }

  if (optionsToml) {
    configs.push(
      new TomlConfig({ ...factoryConfig(optionsToml), ...optionsStyle }).rules(),
    )
  }

  if (optionsTypescript) {
    configs.push(
      new TypescriptConfig({ ...factoryConfig(optionsTypescript), type }).rules(),
    )
  }

  if (optionsVue) {
    configs.push(
      new VueConfig({ ...factoryConfig(optionsVue), graphql: !!optionsGraphql }).rules(),
    )
  }

  if (optionsYaml) {
    configs.push(
      new YamlConfig({ ...factoryConfig(optionsYaml), ...optionsStyle }).rules(),
    )
  }

  if (formatter) {
    configs.push(new PrettierConfig().rules())
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
