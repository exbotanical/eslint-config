import { CustomConfig } from '../base-config'
import { GLOB_SRC, GLOB_SRC_EXT } from '../filepaths'

import type { AllOptions } from '..'
import type { FlatConfigRecord } from '../types'

export class DisablesConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'disables'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    return [
      this.createRuleConfig('scripts', {
        files: [`**/scripts/${GLOB_SRC}`, '**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
        rules: {
          'no-console': 'off',
          'ts/explicit-function-return-type': 'off',
        },
      }),
      this.createRuleConfig('dts', {
        files: ['**/*.d.?([cm])ts'],
        rules: {
          'eslint-comments/no-unlimited-disable': 'off',
          'import/no-duplicates': 'off',
          'no-restricted-syntax': 'off',
          'unused-imports/no-unused-vars': 'off',
        },
      }),
      this.createRuleConfig('cjs', {
        files: ['**/*.js', '**/*.cjs'],
        rules: {
          'ts/no-require-imports': 'off',
        },
      }),
      this.createRuleConfig('config-files', {
        files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
        rules: {
          'no-console': 'off',
          'ts/explicit-function-return-type': 'off',
        },
      }),
    ]
  }
}
