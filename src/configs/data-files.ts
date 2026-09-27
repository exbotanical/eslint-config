// @ts-expect-error -- no types
import pluginComments from '@eslint-community/eslint-plugin-eslint-comments'
import pluginUnicorn from 'eslint-plugin-unicorn'

import { CustomConfig } from '../base-config'

import { COMMENTS_RULES } from './comments'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

/**
 * Applies the file-agnostic checks of the JavaScript rule sets to data files (JSON, YAML,
 * TOML): the byte order mark, eslint directive comments, and unused directives.
 */
export class DataFilesConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'data-files'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const { files = [] } = this.options

    if (files.length === 0) return []

    return [
      this.createRuleConfig('rules', {
        files,
        linterOptions: {
          reportUnusedDisableDirectives: 'error',
          reportUnusedInlineConfigs: 'error',
        },
        plugins: {
          comments: pluginComments,
          unicorn: pluginUnicorn,
        },
        rules: {
          ...COMMENTS_RULES,
          'unicode-bom': ['error', 'never'],
          'unicorn/no-abusive-eslint-disable': 'error',
        },
      }),
    ]
  }
}
