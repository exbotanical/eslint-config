import type { AllOptions, FlatConfigRecord,  } from '../types'

import { GLOB_EXCLUDES } from '../filepaths'

const NAMESPACE = 'exbotanical/ignores'
export interface OptionsIgnores  extends AllOptions {
  files?: string[]
}

export async function ignores(
    opts: OptionsIgnores = {},
  ): Promise<FlatConfigRecord[]> {
  return [
    {
      name: NAMESPACE,
      ignores: [...GLOB_EXCLUDES, ...opts.files ?? []],
    },
  ]
}
