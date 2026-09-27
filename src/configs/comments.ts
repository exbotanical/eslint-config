// @ts-expect-error -- no types
import plugin from '@eslint-community/eslint-plugin-eslint-comments'

import { CustomConfig } from '../base-config'
import { GLOB_SCRIPTS } from '../filepaths'

import type { AllOptions } from '..'
import type { FlatConfigRecord } from '../types'

export class CommentsConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'comments'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    return [
      this.createRuleConfig('rules', {
        files: GLOB_SCRIPTS,
        plugins: {
          comments: plugin,
        },
        rules: {
          'comments/no-aggregating-enable': ['error'],
          'comments/no-duplicate-disable': ['error'],
          'comments/no-unlimited-disable': ['error'],
          'comments/no-unused-enable': ['error'],
          'comments/no-unused-disable': ['error'],
          'comments/require-description': ['warn'],
        },
      }),
    ]
  }
}
