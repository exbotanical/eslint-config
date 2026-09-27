import { configs } from 'eslint-plugin-regexp'

import { CustomConfig } from '../base-config'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

export interface OptionsRegExpr extends AllOptions {
  level?: 'error' | 'warn'
}

export class RegexprConfig extends CustomConfig<OptionsRegExpr> {
  protected namespace: string = 'regexpr'

  constructor({ level = 'error', ...rest }: OptionsRegExpr = {}) {
    super({
      level,
      ...rest,
    })
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const { level = 'error', overrides = {} } = this.options
    const config = configs['flat/recommended']

    const rules = {
      ...config.rules,
    }

    if (level === 'warn') {
      for (const key in rules) {
        if (rules[key] === 'error') rules[key] = 'warn'
      }
    }

    return [
      this.createRuleConfig('rules', {
        ...config,
        rules: {
          ...rules,
          'regexp/prefer-quantifier': level,
          'regexp/prefer-regexp-test': level,
          'regexp/sort-alternatives': level,
          'regexp/sort-character-class-elements': level,
          'regexp/unicode-property': level,
          ...overrides,
        },
      }),
    ]
  }
}
