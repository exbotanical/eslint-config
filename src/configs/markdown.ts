import { CustomConfig } from '../base-config'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from '../filepaths'
import { interopDefault, mergeProcessors, processorPassThrough } from '../utils'

import type { AllOptions, OptionsOverrides } from '../options'
import type { FlatConfigRecord } from '../types'

export interface OptionsMarkdown extends AllOptions {
  /**
   * Lints the code blocks inside Markdown files as source files. Code blocks are often
   * documentation examples, including intentional counterexamples, so autofix rules that
   * reorder or remove code are turned off for them. Other fixes still rewrite them.
   * `overrides` passed here apply to the code blocks.
   *
   * @default false
   */
  lintCodeBlocks?: boolean | OptionsOverrides
}

export class MarkdownConfig extends CustomConfig<OptionsMarkdown> {
  protected namespace: string = 'markdown'

  constructor({
    files = [GLOB_MARKDOWN],
    lintCodeBlocks = false,
    ...rest
  }: OptionsMarkdown = {}) {
    super({
      files,
      lintCodeBlocks,
      ...rest,
    })
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const {
      files = [GLOB_MARKDOWN],
      lintCodeBlocks = false,
      overrides = {},
    } = this.options
    const markdown = await interopDefault(import('@eslint/markdown'))

    return [
      this.createRuleConfig('setup', {
        plugins: { markdown },
      }),
      this.createRuleConfig('rules', {
        files,
        language: 'markdown/gfm',
        rules: {
          ...markdown.configs.recommended[0].rules,
          ...overrides,
        },
      }),
      ...(lintCodeBlocks ? this.codeBlockRules(files, markdown, lintCodeBlocks) : []),
    ]
  }

  /**
   * Builds the records that extract code blocks into virtual files and turn off the
   * rules that do not fit documentation examples.
   */
  private codeBlockRules(
    files: string[],
    markdown: typeof import('@eslint/markdown').default,
    lintCodeBlocks: OptionsOverrides | true,
  ): FlatConfigRecord[] {
    const codeBlockOverrides =
      lintCodeBlocks === true ? {} : (lintCodeBlocks.overrides ?? {})

    return [
      this.createRuleConfig('processor', {
        files,
        ignores: ['**/*.md/*.md'],
        // The markdown processor only creates virtual files for code blocks, but not
        // the markdown file itself (we use passthrough for this).
        processor: mergeProcessors([markdown.processors!.markdown, processorPassThrough]),
      }),
      this.createRuleConfig('disables', {
        files: [GLOB_MARKDOWN_CODE],
        languageOptions: {
          parserOptions: {
            ecmaFeatures: { impliedStrict: true },
          },
        },
        rules: {
          'import/first': 'off',
          'import/newline-after-import': 'off',
          'import/no-duplicates': 'off',
          'import/no-empty-named-blocks': 'off',
          'import/order': 'off',

          'jsdoc/no-blank-blocks': 'off',
          'jsdoc/sort-tags': 'off',

          'no-alert': 'off',
          'no-console': 'off',
          'no-labels': 'off',
          'no-lone-blocks': 'off',
          'no-restricted-syntax': 'off',
          'no-undef': 'off',
          'no-unused-expressions': 'off',
          'no-unused-labels': 'off',

          'no-unused-vars': 'off',
          'no-useless-return': 'off',
          'node/prefer-global/process': 'off',

          'perfectionist/sort-array-includes': 'off',
          'perfectionist/sort-classes': 'off',
          'perfectionist/sort-enums': 'off',
          'perfectionist/sort-exports': 'off',
          'perfectionist/sort-heritage-clauses': 'off',
          'perfectionist/sort-interfaces': 'off',
          'perfectionist/sort-intersection-types': 'off',
          'perfectionist/sort-modules': 'off',
          'perfectionist/sort-named-exports': 'off',
          'perfectionist/sort-named-imports': 'off',
          'perfectionist/sort-object-types': 'off',
          'perfectionist/sort-sets': 'off',
          'perfectionist/sort-union-types': 'off',

          'regexp/sort-alternatives': 'off',
          'regexp/sort-character-class-elements': 'off',
          'regexp/sort-flags': 'off',

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
          'unicorn/prefer-export-from': 'off',
          'unused-imports/no-unused-imports': 'off',
          'unused-imports/no-unused-vars': 'off',

          ...codeBlockOverrides,
        },
      }),
    ]
  }
}
