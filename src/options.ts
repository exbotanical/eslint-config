import type {
  OptionsIgnores,
  OptionsJsonc,
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
  yaml?: boolean | (OptionsOverrides & OptionsFiles)

  /**
   * Enables TOML support.
   *
   * @default true
   */
  toml?: boolean | OptionsToml

  /**
   * Enables linting for Markdown and Markdown code snippets.
   * TODO: update rules
   * @default true
   */
  markdown?: boolean | (OptionsOverrides & OptionsFiles)

  /**
   * Configurable global ignores.
   */
  ignores?: OptionsIgnores

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
}

export interface OptionsStyle {
  indent?: number | 'tab'
  quotes?: 'single' | 'double' | 'backtick'
  semi?: boolean
  jsx?: boolean
}
