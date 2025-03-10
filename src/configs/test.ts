
import { GLOB_TESTS } from '../filepaths'
import { interopDefault } from '../utils'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'
import type { Awaitable, OptionsFiles, OptionsOverrides } from 'dist'

type Runner = 'vitest' | 'jest' | 'tap'

const PLUGIN_RUNNER_MAP: Record<
  Runner | ('cypress' & Runner),
  [string, () => Awaitable<Record<string, any>>]
> = {
  tap: [
    'eslint-plugin-tap',
    () => ({
      'tap/assertion-message': ['error', 'always'],
      'tap/max-asserts': ['error', 8],
      'tap/no-identical-title': 'error',
      'tap/no-ignored-test-files': 'error',
      'tap/no-only-test': 'error',
      'tap/no-skip-test': 'error',
      'tap/no-statement-after-end': 'error',
      'tap/no-unknown-modifiers': 'error',
      'tap/test-ended': 'error',
      'tap/test-title': ['error', 'if-multiple'],
      'tap/use-plan': ['error', 'always'],
      'tap/use-plan-well': 'error',
      'tap/use-t-well': 'error',
      'tap/use-t': 'error',
      'tap/use-tap': 'error',
    }),
  ],
  vitest: [
    '@vitest/eslint-plugin',
    async () => ({
      ...(await interopDefault(import('@vitest/eslint-plugin'))).configs.recommended
        .rules,
    }),
  ],
  jest: [
    'eslint-plugin-jest',
    async () => ({
      ...(await interopDefault(import('eslint-plugin-jest'))).configs['flat/recommended']
        .rules,
    }),
  ],
}

const NAMESPACE = 'exbotanical/test'

export interface OptionsTest extends AllOptions {
  /**
   * Specifies which test runner is being used (and therefore which rules will be applied).
   * Requires installing:
   * - @vitest/eslint-plugin, if runner=vitest
   * - eslint-plugin-jest, if runner=jest
   * - eslint-plugin-tap, if runner=tap
   *
   * @default vitest
   */
  runner?: Runner

  /**
   * Specifies whether to include Cypress test rules.
   *
   * Requires installing:
   * - eslint-plugin-cypress
   *
   * @default false
   */
  cypress?: boolean | (OptionsOverrides & OptionsFiles)
}

export async function test({
  runner = 'vitest',
  cypress = false,
  files = GLOB_TESTS,
  overrides = {},
}: OptionsTest): Promise<FlatConfigRecord[]> {
  const [plugin, rules] = PLUGIN_RUNNER_MAP[runner]

  const [pluginRunner, pluginNoOnlyTests] = await Promise.all([
    interopDefault(import(plugin)),
    // @ts-expect-error no types
    interopDefault(import('eslint-plugin-no-only-tests')),
  ] as const)

  const extraConfigs: FlatConfigRecord[] = []

  if (cypress) {
    // @ts-expect-error no types
    const pluginCypress = await interopDefault(import('eslint-plugin-cypress/flat'))

    extraConfigs.push({
      name: `${NAMESPACE}/cypress/rules`,
      ...pluginCypress.configs.recommended,
      ...(typeof cypress === 'boolean' ? {} : cypress),
    })
  }

  return [
    {
      name: `${NAMESPACE}/setup`,
      plugins: {
        test: {
          ...pluginRunner,
          rules: {
            ...(await Promise.resolve(rules())),
            ...pluginNoOnlyTests.rules,
          },
        },
      },
    },
    {
      name: `${NAMESPACE}/rules`,
      files,
      rules: {
        ...overrides,
      },
    },
    ...extraConfigs,
  ]
}
