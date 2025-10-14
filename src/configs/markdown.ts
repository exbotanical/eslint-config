import { CustomConfig } from '../base-config'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from '../filepaths'
import {
  interopDefault,
  mergeProcessors,
  parserPlain as parser,
  processorPassThrough,
} from '../utils'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

export interface OptionsMarkdown extends AllOptions {}

export class MarkdownConfig extends CustomConfig<OptionsMarkdown> {
  protected namespace: string = 'markdown'

  constructor({ files = [GLOB_MARKDOWN], ...rest }: OptionsMarkdown = {}) {
    super({
      files,
      ...rest,
    })
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const { files = [GLOB_MARKDOWN], overrides = {} } = this.options
    const markdown = await interopDefault(import('@eslint/markdown'))

    return [
      this.createRuleConfig('setup', {
        plugins: { markdown },
      }),
      this.createRuleConfig('processor', {
        files,
        ignores: ['**/*.md/*.md'],
        // `eslint-plugin-markdown` only creates virtual files for code blocks,
        // but not the markdown file itself (we use passthrough for this).
        processor: mergeProcessors([markdown.processors!.markdown, processorPassThrough]),
      }),
      this.createRuleConfig('parser', {
        files,
        languageOptions: {
          parser,
        },
      }),
      this.createRuleConfig('disables', {
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
      }),
    ]
  }
}
