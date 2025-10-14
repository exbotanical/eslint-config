import { CustomConfig } from '../base-config'
import { GLOB_GRAPHQL, GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../filepaths'
import { interopDefault } from '../utils'

import type { AllOptions } from '..'
import type { FlatConfigRecord } from '../types'

export class GraphqlConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'graphql'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const graphqlPlugin = await interopDefault(import('@graphql-eslint/eslint-plugin'))

    const rules = {
      ...graphqlPlugin.configs['flat/operations-recommended'].rules,
      ...graphqlPlugin.configs['flat/schema-recommended'].rules,
    }

    return [
      this.createRuleConfig('setup', {
        files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
        processor: graphqlPlugin.processor,
      }),
      this.createRuleConfig('rules', {
        files: [GLOB_GRAPHQL],
        languageOptions: {
          parser: graphqlPlugin.parser,
        },
        plugins: {
          '@graphql-eslint': graphqlPlugin,
        },
        // @ts-expect-error weird rule types in gql plugin
        rules,
      }),
    ]
  }
}
