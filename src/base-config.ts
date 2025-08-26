import type { AllOptions, FlatConfigRecord } from '.'

export abstract class CustomConfig<T extends AllOptions> {
  protected abstract readonly namespace: string
  protected readonly options: T

  constructor({ type = 'app', overrides = {}, addConfigs = [], ...rest }: T) {
    this.options = {
      type,
      overrides,
      addConfigs,
      ...rest,
    } as T
  }

  protected abstract _rules(): Promise<FlatConfigRecord[]>

  protected createRuleConfig(
    feature: string,
    config: Omit<FlatConfigRecord, 'name'>,
  ): FlatConfigRecord {
    return {
      name: `exbotanical/${this.namespace}/${feature}`,
      ...config,
    }
  }

  async rules(): Promise<FlatConfigRecord[]> {
    return [...(await this._rules()), ...(this.options.addConfigs ?? [])]
  }
}
