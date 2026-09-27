import { CustomConfig } from '../base-config'
import { STYLE_DEFAULTS } from '../defaults'
import { GLOB_TOML } from '../filepaths'
import { interopDefault } from '../utils'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

export interface OptionsToml extends AllOptions {
  indent?: 'tab' | number
}

export class TomlConfig extends CustomConfig<OptionsToml> {
  protected namespace: string = 'toml'

  constructor({
    files = [GLOB_TOML],
    indent = STYLE_DEFAULTS.indent,
    ...rest
  }: OptionsToml = {}) {
    super({
      files,
      indent,
      ...rest,
    })
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const {
      files = [GLOB_TOML],
      overrides = {},
      indent = STYLE_DEFAULTS.indent,
    } = this.options
    const [plugin, parser] = await Promise.all([
      interopDefault(import('eslint-plugin-toml')),
      interopDefault(import('toml-eslint-parser')),
    ] as const)

    return [
      this.createRuleConfig('setup', {
        plugins: {
          toml: plugin as any,
        },
      }),
      this.createRuleConfig('rules', {
        files,
        languageOptions: {
          parser,
        },
        rules: {
          'style/spaced-comment': 'off',

          'toml/comma-style': 'error',
          'toml/keys-order': 'error',
          'toml/no-space-dots': 'error',
          'toml/no-unreadable-number-separator': 'error',
          'toml/precision-of-fractional-seconds': 'error',
          'toml/precision-of-integer': 'error',
          'toml/tables-order': 'error',

          'toml/vue-custom-block/no-parsing-error': 'error',

          'toml/array-bracket-newline': 'error',
          'toml/array-bracket-spacing': 'error',
          'toml/array-element-newline': 'error',
          'toml/indent': ['error', indent === 'tab' ? 2 : indent],
          'toml/inline-table-curly-spacing': 'error',
          'toml/key-spacing': 'error',
          'toml/padding-line-between-pairs': 'error',
          'toml/padding-line-between-tables': 'error',
          'toml/quoted-keys': 'error',
          'toml/spaced-comment': 'error',
          'toml/table-bracket-spacing': 'error',

          ...overrides,
        },
      }),
    ]
  }
}
