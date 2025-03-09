import { GLOB_JSX, GLOB_TSX } from '../filepaths'

import type { FlatConfigRecord } from '../types'

const NAMESPACE = 'exbotanical/jsx'

export async function jsx(): Promise<FlatConfigRecord[]> {
  return [
    {
      name: `${NAMESPACE}/setup`,
      files: [GLOB_JSX, GLOB_TSX],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
  ]
}
