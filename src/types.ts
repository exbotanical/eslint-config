import type { Linter } from 'eslint'
import type { RuleOptions } from './typegen'
import { OptionsTypescript } from './configs/typescript'
import { OptionsIgnores } from './configs/ignores'
import { OptionsJsonc } from './configs/jsonc'
import { OptionsToml } from './configs/toml'
import { OptionsFormat } from './configs'

export type Rules = RuleOptions
export type FlatConfigRecord = Omit<
  Linter.Config<Linter.RulesRecord & Rules>,
  'plugins'
> & {
  plugins?: Record<string, any>
}

export interface OptionsOverrides {
  overrides?: FlatConfigRecord['rules']
}
export interface OptionsProjectType {
  type?: 'app' | 'lib'
}
export interface OptionsFiles {
  files?: string[]
}

export interface OptionsHasTypeScript {
  typescript?: boolean
}

export type AllOptions = OptionsOverrides & OptionsFiles & OptionsProjectType

export interface ConfigFactory {
  <T extends AllOptions>(opts?: T): Promise<FlatConfigRecord[]>
}

export interface OptionsConfig extends OptionsProjectType {
  javascript?: OptionsOverrides
  typescript?: boolean | OptionsTypescript
  test?: boolean | OptionsOverrides
  vue?: boolean | OptionsOverrides
  react?: boolean | OptionsOverrides
  jsonc?: boolean | OptionsJsonc
  yaml?: boolean | OptionsOverrides
  toml?: boolean | OptionsToml
  markdown?: boolean | OptionsOverrides
  ignores?: OptionsIgnores
  style?: OptionsStyle
  format?: 'prettier' | OptionsFormat
}

export interface OptionsStyle {
  indent?: number | 'tab'
  quotes?: 'single' | 'double' | 'backtick'
  semi?: boolean
  jsx?: boolean
  arrowParens?: boolean
  braceStyle?: '1tbs' | 'stroustrup' | 'allman'
  blockSpacing?: boolean
  quoteProps?: 'always' | 'as-needed' | 'consistent' | 'consistent-as-needed'
  commaDangle?: 'never' | 'always' | 'always-multiline' | 'only-multiline'
}
