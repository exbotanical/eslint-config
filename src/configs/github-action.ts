import { CustomConfig } from '../base-config'
import { GLOB_GITHUB_WORKFLOW } from '../filepaths'
import { interopDefault } from '../utils'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

export class GithubActionConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'github-action'

  constructor({ files = [GLOB_GITHUB_WORKFLOW], ...rest }: AllOptions = {}) {
    super({
      files,
      ...rest,
    })
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const { files, overrides = {} } = this.options
    const plugin = await interopDefault(import('eslint-plugin-github-action'))
    const [recommended] = plugin.configs.recommended

    return [
      this.createRuleConfig('rules', {
        ...recommended,
        files,
        rules: {
          ...recommended.rules,
          ...overrides,
        },
      }),
    ]
  }
}
