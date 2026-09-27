import { CustomConfig } from '../base-config'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_TOML, GLOB_YAML } from '../filepaths'
import { interopDefault } from '../utils'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

export class JsonSchemaConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'json-schema'

  constructor({
    files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_YAML, GLOB_TOML],
    ...rest
  }: AllOptions = {}) {
    super({
      files,
      ...rest,
    })
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const { files, overrides = {} } = this.options
    const plugin = await interopDefault(import('eslint-plugin-json-schema-validator'))

    return [
      this.createRuleConfig('rules', {
        files,
        plugins: {
          'json-schema-validator': plugin,
        },
        rules: {
          'json-schema-validator/no-invalid': 'error',
          ...overrides,
        },
      }),
    ]
  }
}
