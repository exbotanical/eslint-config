import type { FlatConfigRecord } from '../types'

import plugin from '../vendor/plugins/eslint-config-prettier'

export async function prettier(): Promise<FlatConfigRecord[]> {
  return [plugin]
}
