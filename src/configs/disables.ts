import type { FlatConfigRecord } from '../types'

import { GLOB_SRC, GLOB_SRC_EXT } from '../filepaths'

const NAMESPACE = 'exbotanical/disables'
export async function disables(): Promise<FlatConfigRecord[]> {
  return [
    {
      name: `${NAMESPACE}/scripts`,
      files: [
        `**/scripts/${GLOB_SRC}`,
        '**/bin/**/*',
        `**/bin.${GLOB_SRC_EXT}`,
      ],
      rules: {
        'no-console': 'off',
        'ts/explicit-function-return-type': 'off',
      },
    },
    {
      name: `${NAMESPACE}/dts`,
      files: ['**/*.d.?([cm])ts'],
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      name: `${NAMESPACE}/cjs`,
      files: ['**/*.js', '**/*.cjs'],
      rules: {
        'ts/no-require-imports': 'off',
      },
    },
    {
      name: `${NAMESPACE}/config-files`,
      files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
      rules: {
        'no-console': 'off',
        'ts/explicit-function-return-type': 'off',
      },
    },
  ]
}
