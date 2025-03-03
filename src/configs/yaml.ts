import { interopDefault } from '../utils'
import { GLOB_YAML } from '../filepaths'
import type { AllOptions, FlatConfigRecord } from '../types'
import { STYLE_DEFAULTS } from '../defaults'

const NAMESPACE = 'exbotanical/yaml'

export interface OptionsYaml extends AllOptions {
  indent?: number | 'tab'
  quotes?: 'single' | 'backtick'
}

export async function yaml(
  { files = [GLOB_YAML], overrides = {} }: OptionsYaml = {},
  { indent, quotes } = STYLE_DEFAULTS,
): Promise<FlatConfigRecord[]> {
  const [plugin, parser] = await Promise.all([
    interopDefault(import('eslint-plugin-yml')),
    interopDefault(import('yaml-eslint-parser')),
  ] as const)

  return [
    {
      name: `${NAMESPACE}/setup`,
      plugins: {
        yaml: plugin as any,
      },
    },
    {
      name: `${NAMESPACE}/rules`,
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
        'yaml/no-empty-document':'error',
        'yaml/no-empty-mapping-value':'error',
        'yaml/no-trailing-zeros':'error',
        'yaml/no-multiple-empty-lines': 'error',
        ...overrides,
      },
    },
  ]
}
