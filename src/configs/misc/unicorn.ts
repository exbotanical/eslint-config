import pluginUnicorn from 'eslint-plugin-unicorn'

import { CustomConfig } from '../../base-config'

import type { AllOptions } from '../..'
import type { FlatConfigRecord } from '../../types'

export class UnicornConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'misc/unicorn'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    return [
      this.createRuleConfig('rules', {
        plugins: {
          unicorn: pluginUnicorn,
        },
        rules: {
          ...pluginUnicorn.configs.recommended.rules,
          'unicorn/prevent-abbreviations': 'off',
          'unicorn/no-null': 'off',
          'unicorn/prefer-top-level-await': 'off',
          'unicorn/filename-case': 'off',
          'unicorn/no-await-expression-member': 'off',
          'unicorn/throw-new-error': 'off',
          'unicorn/no-array-callback-reference': 'off',
          'unicorn/no-new-array': 'off',
        },
      }),
    ]
  }
}
