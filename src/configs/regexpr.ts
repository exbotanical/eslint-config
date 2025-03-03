import type { AllOptions, FlatConfigRecord } from '../types'

import { configs } from 'eslint-plugin-regexp'

const NAMESPACE = 'exbotanical/regexpr'
export interface OptionsRegExpr extends AllOptions {
  level?: 'error' | 'warn'
}
export async function regexpr({
  level = 'error',
  overrides = {},
}: OptionsRegExpr = {}): Promise<FlatConfigRecord[]> {
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
    {
      ...config,
      name: `${NAMESPACE}/rules`,
      rules: {
        ...rules,
        ...overrides,
      },
    },
  ]
}
