import { CustomConfig } from '../base-config'
import plugin from '../vendor/plugins/eslint-config-prettier'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

export class PrettierConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'prettier'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    return [
      this.createRuleConfig('rules', {
        ...plugin,
        rules: {
          ...plugin.rules,
          ...this.options.overrides,
        },
      }),
    ]
  }
}
