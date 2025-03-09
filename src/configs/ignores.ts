import { GLOB_EXCLUDES } from '../filepaths'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

const NAMESPACE = 'exbotanical/ignores'

export interface OptionsIgnores extends AllOptions {
  files?: string[]
}

export async function ignores({ files = [] }: OptionsIgnores = {}): Promise<
  FlatConfigRecord[]
> {
  return [
    {
      name: NAMESPACE,
      ignores: [...GLOB_EXCLUDES, ...files],
    },
  ]
}
