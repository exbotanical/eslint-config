import { isPackageExists } from 'local-pkg'

import {
  CommentsConfig,
  CssConfig,
  DataFilesConfig,
  DisablesConfig,
  GithubActionConfig,
  GraphqlConfig,
  IgnoresConfig,
  ImportsConfig,
  JavascriptConfig,
  JsdocConfig,
  JsoncConfig,
  JsonSchemaConfig,
  JsxConfig,
  MarkdownConfig,
  NodeConfig,
  PackageJsonConfig,
  PackageJsonPluginConfig,
  PerfectionistConfig,
  PrettierConfig,
  ReactConfig,
  RegexprConfig,
  TestConfig,
  TomlConfig,
  TsconfigConfig,
  TypescriptConfig,
  UnicornConfig,
  VueConfig,
  YamlConfig,
} from './configs'
import { STYLE_DEFAULTS } from './defaults'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_TOML, GLOB_YAML } from './filepaths'

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
    packageJson: optionsPackageJson = false,
    jsonSchema: optionsJsonSchema = false,
    githubAction: optionsGithubAction = false,
    css: optionsCss = false,
    perfectionist: optionsPerfectionist,
    type,
  }: LinterOptions = {},
  ...userConfigs: Awaitable<FlatConfigRecord | FlatConfigRecord[] | Linter.Config[]>[]
): Promise<FlatConfigRecord[]> {
  const configs = [
    new PerfectionistConfig({ ...optionsPerfectionist }).rules(),
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
      ...(optionsPackageJson ? [] : [new PackageJsonConfig().rules()]),
      new TsconfigConfig().rules(),
      new JsoncConfig({
        ...factoryConfig(optionsJsonc),
        ...optionsStyle,
      }).rules(),
    )
  }

  if (optionsPackageJson) {
    configs.push(
      new PackageJsonPluginConfig({ ...factoryConfig(optionsPackageJson) }).rules(),
    )
  }

  if (optionsJsonSchema) {
    configs.push(new JsonSchemaConfig({ ...factoryConfig(optionsJsonSchema) }).rules())
  }

  if (optionsGithubAction) {
    configs.push(
      new GithubActionConfig({ ...factoryConfig(optionsGithubAction) }).rules(),
    )
  }

  if (optionsCss) {
    configs.push(new CssConfig({ ...factoryConfig(optionsCss) }).rules())
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

  // Markdown code-block disables must follow every config that enables rules for
  // source files, or those configs re-enable the disabled rules.
  if (optionsMarkdown) {
    configs.push(new MarkdownConfig({ ...factoryConfig(optionsMarkdown) }).rules())
  }

  configs.push(
    new DataFilesConfig({
      files: [
        ...(optionsJsonc ? [GLOB_JSON, GLOB_JSON5, GLOB_JSONC] : []),
        ...(optionsYaml ? [GLOB_YAML] : []),
        ...(optionsToml ? [GLOB_TOML] : []),
      ],
    }).rules(),
  )

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

function factoryConfig<T>(options: boolean | T): T {
  if (!options) return {} as T
  return (typeof options === 'boolean' ? {} : options) as T
}

// TODO: @graphql-eslint/eslint-plugin
