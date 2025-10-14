import { CustomConfig } from '../base-config'
import { GLOB_EXCLUDES } from '../filepaths'

import type { AllOptions } from '..'
import type { FlatConfigRecord } from '../types'

export class IgnoresConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'ignores'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    return [
      this.createRuleConfig('setup', {
        ignores: [...GLOB_EXCLUDES, ...(this.options.files ?? [])],
      }),
    ]
  }
}
