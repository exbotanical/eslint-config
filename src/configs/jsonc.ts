import { STYLE_DEFAULTS } from '../defaults'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../filepaths'
import { interopDefault } from '../utils'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

const NAMESPACE = 'exbotanical/jsonc'

export interface OptionsJsonc extends AllOptions {}

export async function jsonc(
  {
    files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    overrides = {},
  }: OptionsJsonc = {},
  { indent } = STYLE_DEFAULTS,
): Promise<FlatConfigRecord[]> {
  const [plugin, parser] = await Promise.all([
    interopDefault(import('eslint-plugin-jsonc')),
    interopDefault(import('jsonc-eslint-parser')),
  ] as const)

  return [
    {
      name: `${NAMESPACE}/setup`,
      plugins: {
        jsonc: plugin as any,
      },
    },
    {
      files,
      languageOptions: {
        parser,
      },
      name: `${NAMESPACE}/rules`,
      rules: {
        'jsonc/no-bigint-literals': 'error',
        'jsonc/no-binary-expression': 'error',
        'jsonc/no-binary-numeric-literals': 'error',
        'jsonc/no-dupe-keys': 'error',
        'jsonc/no-escape-sequence-in-identifier': 'error',
        'jsonc/no-floating-decimal': 'error',
        'jsonc/no-hexadecimal-numeric-literals': 'error',
        'jsonc/no-infinity': 'error',
        'jsonc/no-multi-str': 'error',
        'jsonc/no-nan': 'error',
        'jsonc/no-number-props': 'error',
        'jsonc/no-numeric-separators': 'error',
        'jsonc/no-octal': 'error',
        'jsonc/no-octal-escape': 'error',
        'jsonc/no-octal-numeric-literals': 'error',
        'jsonc/no-parenthesized': 'error',
        'jsonc/no-plus-sign': 'error',
        'jsonc/no-regexp-literals': 'error',
        'jsonc/no-sparse-arrays': 'error',
        'jsonc/no-template-literals': 'error',
        'jsonc/no-undefined-value': 'error',
        'jsonc/no-unicode-codepoint-escapes': 'error',
        'jsonc/no-useless-escape': 'error',
        'jsonc/space-unary-ops': 'error',
        'jsonc/valid-json-number': 'error',
        'jsonc/vue-custom-block/no-parsing-error': 'error',
        'jsonc/array-bracket-spacing': ['error', 'never'],
        'jsonc/comma-dangle': ['error', 'never'],
        'jsonc/comma-style': ['error', 'last'],
        'jsonc/indent': ['error', indent],
        'jsonc/key-spacing': [
          'error',
          { afterColon: true, beforeColon: false },
        ],
        'jsonc/object-curly-newline': [
          'error',
          { consistent: true, multiline: true },
        ],
        'jsonc/object-curly-spacing': ['error', 'always'],
        'jsonc/object-property-newline': [
          'error',
          { allowMultiplePropertiesPerLine: true },
        ],
        'jsonc/quote-props': 'error',
        'jsonc/quotes': 'error',
        ...overrides,
      },
    },
  ]
}
