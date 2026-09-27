import { CustomConfig } from '../base-config'
import plugin from '../vendor/plugins/eslint-config-prettier'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

/**
 * Format-plugin rules whose fixes produce layout that Prettier rewrites, so that running
 * `eslint --fix` and Prettier in either order never converges.
 */
const FORMAT_PLUGIN_RULES: FlatConfigRecord['rules'] = {
  'jsonc/comma-dangle': 'off',
  'jsonc/indent': 'off',
  'jsonc/quote-props': 'off',
  'jsonc/quotes': 'off',
  'toml/array-bracket-spacing': 'off',
  'toml/array-element-newline': 'off',
  'toml/indent': 'off',
  'yaml/flow-mapping-curly-spacing': 'off',
  'yaml/indent': 'off',
  'yaml/quotes': 'off',
}

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
          ...FORMAT_PLUGIN_RULES,
          ...this.options.overrides,
        },
      }),
    ]
  }
}
