// @ts-expect-error -- no types
import plugin from 'eslint-plugin-import'

import { CustomConfig } from '../base-config'
import { GLOB_SCRIPTS } from '../filepaths'

import type { AllOptions } from '..'
import type { FlatConfigRecord } from '../types'

export class ImportsConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'imports'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    return [
      this.createRuleConfig('rules', {
        files: GLOB_SCRIPTS,
        plugins: {
          import: plugin as any,
        },
        rules: {
          'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
          'import/first': 'error',
          'import/no-duplicates': 'error',
          'import/no-mutable-exports': 'error',
          'import/no-named-default': 'error',
          'import/no-self-import': 'error',
          'import/no-webpack-loader-syntax': 'error',
          'import/no-absolute-path': 'error',
          'import/no-empty-named-blocks': 'error',
          'import/no-useless-path-segments': 'error',
          'import/newline-after-import': ['error', { count: 1 }],
          'import/no-unresolved': 'off',
          'import/order': [
            'error',
            {
              'alphabetize': {
                caseInsensitive: true,
                order: 'asc',
              },
              'groups': [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'index',
                'object',
                'type',
              ],
              'newlines-between': 'always',
              'pathGroups': [
                {
                  group: 'external',
                  pattern: '{vue,@vue/**}',
                  position: 'before',
                },
                {
                  group: 'external',
                  pattern: '{react,@react/**}',
                  position: 'before',
                },
                {
                  group: 'internal',
                  pattern: '@/**',
                  position: 'before',
                },
                {
                  group: 'internal',
                  pattern: '@@/**',
                  position: 'before',
                },
              ],
            },
          ],
        },
      }),
    ]
  }
}
