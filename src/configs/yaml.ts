import { CustomConfig } from '../base-config'
import { STYLE_DEFAULTS } from '../defaults'
import { GLOB_YAML } from '../filepaths'
import { interopDefault } from '../utils'

import type { AllOptions, OptionsSortKeys } from '../options'
import type { FlatConfigRecord } from '../types'

export interface OptionsYaml extends AllOptions, OptionsSortKeys {
  indent?: 'tab' | number
  quotes?: 'backtick' | 'double' | 'single'
}

export class YamlConfig extends CustomConfig<OptionsYaml> {
  protected namespace: string = 'yaml'

  constructor({
    files = [GLOB_YAML],
    indent = STYLE_DEFAULTS.indent,
    quotes = STYLE_DEFAULTS.quotes,
    ...rest
  }: OptionsYaml = {}) {
    super({
      files,
      indent,
      quotes,
      ...rest,
    })
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const {
      files = [GLOB_YAML],
      overrides = {},
      indent = STYLE_DEFAULTS.indent,
      quotes = STYLE_DEFAULTS.quotes,
      sortKeys = [],
    } = this.options
    const [plugin, parser] = await Promise.all([
      interopDefault(import('eslint-plugin-yml')),
      interopDefault(import('yaml-eslint-parser')),
    ] as const)

    return [
      this.createRuleConfig('setup', {
        plugins: {
          yaml: plugin as any,
        },
      }),
      this.createRuleConfig('rules', {
        files,
        languageOptions: {
          parser,
        },
        rules: {
          'style/spaced-comment': 'off',
          'yaml/block-mapping-colon-indicator-newline': 'error',
          'yaml/block-mapping-question-indicator-newline': 'error',
          'yaml/block-mapping': 'error',
          'yaml/block-sequence': 'error',
          'yaml/no-empty-key': 'error',
          'yaml/no-empty-sequence-entry': 'error',
          'yaml/no-irregular-whitespace': 'error',
          'yaml/plain-scalar': 'error',

          'yaml/vue-custom-block/no-parsing-error': 'error',

          'yaml/block-sequence-hyphen-indicator-newline': 'error',
          'yaml/flow-mapping-curly-newline': 'error',
          'yaml/flow-mapping-curly-spacing': 'error',
          'yaml/flow-sequence-bracket-newline': 'error',
          'yaml/flow-sequence-bracket-spacing': 'error',
          'yaml/indent': ['error', indent === 'tab' ? 2 : indent],
          'yaml/key-spacing': 'error',
          'yaml/no-tab-indent': 'error',
          'yaml/quotes': [
            'error',
            {
              avoidEscape: true,
              prefer: quotes === 'backtick' ? 'single' : quotes,
            },
          ],
          'yaml/spaced-comment': 'error',
          'yaml/no-empty-document': 'error',
          'yaml/no-empty-mapping-value': 'error',
          'yaml/no-trailing-zeros': 'error',
          'yaml/no-multiple-empty-lines': 'error',
          ...overrides,
        },
      }),
      ...(sortKeys.length > 0
        ? [
            this.createRuleConfig('sort-keys', {
              files: sortKeys,
              languageOptions: {
                parser,
              },
              rules: {
                'yaml/sort-keys': [
                  'error',
                  'asc',
                  { allowLineSeparatedGroups: true, natural: true },
                ],
              },
            }),
          ]
        : []),
    ]
  }
}
