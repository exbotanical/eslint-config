import pluginPerfectionist from 'eslint-plugin-perfectionist'

import { CustomConfig } from '../../base-config'

import type { AllOptions } from '../..'
import type { FlatConfigRecord } from '../../types'

export class PerfectionistConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'misc/perfectionist'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    return [
      this.createRuleConfig('setup', {
        plugins: {
          perfectionist: pluginPerfectionist,
        },
        rules: {
          'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
          'perfectionist/sort-named-exports': [
            'error',
            { order: 'asc', type: 'natural' },
          ],
        },
      }),
    ]
  }
}
