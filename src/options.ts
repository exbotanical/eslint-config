import type {
  OptionsJsonc,
  OptionsMarkdown,
  OptionsPerfectionist,
  OptionsTest,
  OptionsToml,
  OptionsTypescript,
  OptionsVue,
} from './configs'
import type { FlatConfigRecord } from './types'
import type { ParserOptions } from '@typescript-eslint/parser'

export interface OptionsOverrides {
  overrides?: FlatConfigRecord['rules']
}

export interface OptionsProjectType {
  /**
   * Type of the project. `lib` will enable more strict rules for libraries.
   * @default 'app'
   */
  type?: 'app' | 'lib'
}

export interface OptionsFiles {
  /**
   * Overrides the `files` option to provide custom globs.
   */
  files?: string[]
}

export interface OptionsSortKeys {
  /**
   * Glob patterns for files whose keys are sorted in ascending natural order at every
   * depth. A blank line starts a new group that is sorted separately. `package.json`
   * and `tsconfig.json` keep their own key order.
   * @default []
   */
  sortKeys?: string[]
}

export interface OptionsHasTypeScript {
  typescript?: boolean
}

export interface OptionsTypeScriptParser {
  /**
   * Specifies the tsconfig path. Enables type-aware rules.
   */
  tsconfigPath?: string

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[]

  /**
   * Glob patterns for files that should not be type aware.
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[]

  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>
}

export type AllOptions = OptionsOverrides & OptionsFiles & OptionsProjectType

export interface OptionsConfig extends OptionsProjectType {
  /**
   * Core ruleset. Cannot be disabled.
   */
  javascript?: OptionsOverrides & OptionsFiles

  /**
   * Enables TypeScript support.
   *
   * @default auto-detect based on local dependencies
   */
  typescript?: boolean | OptionsTypescript

  /**
   * Enables test rules.
   *
   * @default true - vitest
   */
  test?: boolean | OptionsTest

  /**
   * Enables Vue rules.
   *
   * Requires installing:
   * - eslint-plugin-vue
   * - vue-eslint-parser
   * - eslint-processor-vue-blocks (only if embedded graphql is enabled)
   *
   * @default false
   */
  vue?: boolean | OptionsVue

  /**
   * Enables React rules.
   *
   * Requires installing:
   * - @eslint-react/eslint-plugin
   * - eslint-plugin-react-hooks
   * - eslint-plugin-react-refresh
   *
   * @default false
   */
  react?: boolean | (OptionsOverrides & OptionsFiles)

  /**
   * Enables JSONC support.
   */
  jsonc?: boolean | OptionsJsonc

  /**
   * Enables YAML support.
   *
   * @default true
   */
  yaml?: boolean | (OptionsOverrides & OptionsFiles & OptionsSortKeys)

  /**
   * Enables TOML support.
   *
   * @default true
   */
  toml?: boolean | OptionsToml

  /**
   * Enables Markdown document rules. Code blocks are linted only when
   * `lintCodeBlocks` is set.
   *
   * @default true
   */
  markdown?: boolean | OptionsMarkdown

  /**
   * Configurable global ignores.
   */
  ignores?: string[]

  /**
   * Style settings.
   */
  style?: OptionsStyle

  /**
   * Disables certain rules to accommodate prettier.
   *
   * @default true
   */
  formatter?: boolean

  /**
   * Enables graphql linting.
   *
   * Requires installing:
   * - @graphql-eslint/eslint-plugin
   * - eslint-processor-vue-blocks (only if graphql embedded in vue is enabled)
   
   * @default false
   */
  graphql?: boolean | (OptionsOverrides & OptionsFiles)

  /**
   * Enables eslint-plugin-package-json with its `recommended` and `stylistic` rules for
   * `package.json`. Replaces the built-in `package.json` key and array order.
   *
   * Requires installing:
   * - eslint-plugin-package-json
   *
   * @default false
   */
  packageJson?: boolean | OptionsOverrides

  /**
   * Validates JSON, YAML, and TOML files against the JSON schema named by their `$schema`
   * key or matched by file name in the SchemaStore catalog. Applies only to files that
   * the `jsonc`, `yaml`, and `toml` options parse.
   *
   * At lint time the rule downloads the SchemaStore catalog and each matched schema over
   * HTTPS on first use, then caches them on disk for 24 hours. When a download fails, the
   * file is not validated and no error is reported.
   *
   * Requires installing:
   * - eslint-plugin-json-schema-validator
   *
   * @default false
   */
  jsonSchema?: boolean | (OptionsFiles & OptionsOverrides)

  /**
   * Enables GitHub Actions workflow rules from eslint-plugin-github-action.
   *
   * Requires installing:
   * - eslint-plugin-github-action
   *
   * @default false
   */
  githubAction?: boolean | (OptionsFiles & OptionsOverrides)

  /**
   * Enables CSS linting with the `recommended` rules of @eslint/css.
   *
   * Requires installing:
   * - @eslint/css
   *
   * @default false
   */
  css?: boolean | (OptionsFiles & OptionsOverrides)

  /**
   * Configures sorting rules.
   */
  perfectionist?: OptionsPerfectionist
}

export interface OptionsStyle {
  indent?: 'tab' | number
  quotes?: 'backtick' | 'double' | 'single'
  semi?: boolean
  jsx?: boolean
}
