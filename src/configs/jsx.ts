import { CustomConfig } from '../base-config'
import { GLOB_JSX, GLOB_TSX } from '../filepaths'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

export class JsxConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'jsx'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    return [
      this.createRuleConfig('setup', {
        files: [GLOB_JSX, GLOB_TSX],
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true,
            },
          },
        },
      }),
    ]
  }
}
