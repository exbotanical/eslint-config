import { GLOB_GRAPHQL, GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../filepaths'
import { interopDefault } from '../utils'

import type { FlatConfigRecord } from '../types'

export async function graphql(): Promise<FlatConfigRecord[]> {
  const graphqlPlugin = await interopDefault(import('@graphql-eslint/eslint-plugin'))

  const rules = {
    ...graphqlPlugin.configs['flat/operations-recommended'].rules,
    ...graphqlPlugin.configs['flat/schema-recommended'].rules,
  }

  return [
    {
      files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
      processor: graphqlPlugin.processor,
    },
    {
      files: [GLOB_GRAPHQL],
      languageOptions: {
        parser: graphqlPlugin.parser,
      },
      plugins: {
        '@graphql-eslint': graphqlPlugin,
      },
      rules,
    },
  ]
}
