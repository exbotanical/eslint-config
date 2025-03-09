// @ts-expect-error -- no types
import plugin from 'eslint-plugin-import'

import type { FlatConfigRecord } from '../types'

const NAMESPACE = 'exbotanical/imports'

export async function imports(): Promise<FlatConfigRecord[]> {
  return [
    {
      name: `${NAMESPACE}/rules`,
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
    },
  ]
}
