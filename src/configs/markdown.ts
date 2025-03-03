import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from '../filepaths'
import type { AllOptions, FlatConfigRecord } from '../types'
import {
  interopDefault,
  mergeProcessors,
  parserPlain as parser,
  processorPassThrough,
} from '../utils'

const NAMESPACE = 'exbotanical/markdown'
export interface OptionsMarkdown extends AllOptions {}
export async function markdown({
  files = [GLOB_MARKDOWN],
  overrides = {},
}: OptionsMarkdown = {}): Promise<FlatConfigRecord[]> {
  const markdown = await interopDefault(import('@eslint/markdown'))

  return [
    {
      name: `${NAMESPACE}/setup`,
      plugins: { markdown },
    },
    {
      name: `${NAMESPACE}/processor`,
      files,
      ignores: ["**/*.md/*.md"],
      // `eslint-plugin-markdown` only creates virtual files for code blocks,
      // but not the markdown file itself (we use passthrough for this).
      processor: mergeProcessors([
        markdown.processors!.markdown,
        processorPassThrough,
      ]),
    },
    {
      name: `${NAMESPACE}/parser`,
      files,
      languageOptions: {
        parser,
      },
    },
    {
      name: `${NAMESPACE}/disables`,
      files: [GLOB_MARKDOWN_CODE],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { impliedStrict: true },
        },
      },
      rules: {
        'import/newline-after-import': 'off',

        'no-alert': 'off',
        'no-console': 'off',
        'no-labels': 'off',
        'no-lone-blocks': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-labels': 'off',

        'no-unused-vars': 'off',
        'node/prefer-global/process': 'off',
        'style/comma-dangle': 'off',

        'style/eol-last': 'off',
        'ts/consistent-type-imports': 'off',
        'ts/explicit-function-return-type': 'off',
        'ts/no-namespace': 'off',
        'ts/no-redeclare': 'off',
        'ts/no-require-imports': 'off',
        'ts/no-unused-expressions': 'off',
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': 'off',

        'unicode-bom': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',

        ...overrides,
      },
    },
  ]
}
