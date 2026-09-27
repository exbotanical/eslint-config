import plugin from 'eslint-plugin-n'

import { CustomConfig } from '../base-config'
import { GLOB_SCRIPTS } from '../filepaths'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

export class NodeConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'node'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    return [
      this.createRuleConfig('rules', {
        files: GLOB_SCRIPTS,
        plugins: {
          node: plugin,
        },
        rules: {
          'node/handle-callback-err': ['error', '^(err|error)$'],
          'node/no-deprecated-api': 'error',
          'node/no-exports-assign': 'error',
          'node/no-new-require': 'error',
          'node/no-path-concat': 'error',
          'node/prefer-global/buffer': ['error', 'never'],
          'node/process-exit-as-throw': 'error',
          'node/hashbang': 'error',
          ...this.options.overrides,
        },
      }),
    ]
  }
}
