import type { FlatConfigRecord } from '../types'

import plugin from 'eslint-plugin-import-x'

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

      },
    },
  ]
}
