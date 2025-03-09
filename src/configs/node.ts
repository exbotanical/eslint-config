import plugin from 'eslint-plugin-n'

import type { FlatConfigRecord } from '../types'

const NAMESPACE = 'exbotanical/node'

export async function node(): Promise<FlatConfigRecord[]> {
  return [
    {
      name: `${NAMESPACE}/rules`,
      plugins: {
        node: plugin,
      },
      rules: {
        'node/handle-callback-err': ['error', '^(err|error)$'],
        'node/no-deprecated-api': 'error',
        'node/no-exports-assign': 'error',
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/prefer-global/buffer': ['error', 'never'],
        'node/process-exit-as-throw': 'error',
      },
    },
  ]
}
