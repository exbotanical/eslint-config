import { GLOB_JSX, GLOB_TSX } from '../filepaths'
import type { FlatConfigRecord } from '../types'

export async function jsx(): Promise<FlatConfigRecord[]> {
  return [
    {
      name: 'exbotanical/jsx/setup',
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
