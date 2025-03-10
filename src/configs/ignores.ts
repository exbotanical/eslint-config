import { GLOB_EXCLUDES } from '../filepaths'

import type { FlatConfigRecord } from '../types'

const NAMESPACE = 'exbotanical/ignores'

export async function ignores(files: string[] = []): Promise<FlatConfigRecord[]> {
  return [
    {
      name: NAMESPACE,
      ignores: [...GLOB_EXCLUDES, ...files],
    },
  ]
}
