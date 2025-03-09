import type { RuleOptions } from './typegen'
import type { Linter } from 'eslint'

export type Rules = RuleOptions

export type FlatConfigRecord = Omit<
  Linter.Config<Linter.RulesRecord & Rules>,
  'plugins'
> & {
  plugins?: Record<string, any>
}
