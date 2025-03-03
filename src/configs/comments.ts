import type { FlatConfigRecord } from '../types'

// @ts-ignore
import plugin from '@eslint-community/eslint-plugin-eslint-comments'

const NAMESPACE = 'exbotanical/comments'
export async function comments(): Promise<FlatConfigRecord[]> {
  return [
    {
      name: `${NAMESPACE}/rules`,
      plugins: {
        comments: plugin,
      },
      rules: {
        'comments/no-aggregating-enable': ['error'],
        'comments/no-duplicate-disable': ['error'],
        'comments/no-unlimited-disable': ['error'],
        'comments/no-unused-enable': ['error'],
        'comments/no-unused-disable': ['error'],
        'comments/require-description': ['warn'],
      },
    },
  ]
}
