import pluginUnicorn from 'eslint-plugin-unicorn'

import type { FlatConfigRecord } from '../../types'

const NAMESPACE = 'exbotanical/misc/unicorn'

export async function unicorn(): Promise<FlatConfigRecord[]> {
  return [
    {
      name: `${NAMESPACE}/rules`,
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        ...pluginUnicorn.configs.recommended.rules,
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/filename-case': 'off',
      },
    },
  ]
}
