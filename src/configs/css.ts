import { CustomConfig } from '../base-config'
import { GLOB_CSS } from '../filepaths'
import { interopDefault } from '../utils'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

export class CssConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'css'

  constructor({ files = [GLOB_CSS], ...rest }: AllOptions = {}) {
    super({
      files,
      ...rest,
    })
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const { files, overrides = {} } = this.options
    const plugin = await interopDefault(import('@eslint/css'))

    return [
      this.createRuleConfig('rules', {
        files,
        language: 'css/css',
        plugins: {
          css: plugin,
        },
        rules: {
          ...plugin.configs.recommended.rules,
          ...overrides,
        },
      }),
    ]
  }
}
