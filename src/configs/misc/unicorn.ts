import type { FlatConfigRecord } from '../../types'

import pluginUnicorn from 'eslint-plugin-unicorn'

const NAMESPACE = 'exbotanical/misc/unicorn'
export async function unicorn(): Promise<FlatConfigRecord[]> {
  return [
    {
      name: `${NAMESPACE}/rules`,
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        ...pluginUnicorn.configs['recommended'].rules,
      },
    },
  ]
}
