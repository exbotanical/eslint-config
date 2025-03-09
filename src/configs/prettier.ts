import plugin from '../vendor/plugins/eslint-config-prettier'

import type { FlatConfigRecord } from '../types'


export async function prettier(): Promise<FlatConfigRecord[]> {
  return [plugin]
}
