import pluginCypress from 'eslint-plugin-cypress/flat'

import { GLOB_TESTS } from '../filepaths'
import { interopDefault } from '../utils'
// @ts-expect-error no types

import type { AllOptions, OptionsFiles, OptionsOverrides } from '../options'
import type { FlatConfigRecord } from '../types'

type Runner = 'vitest' | 'jest' | 'tap'

const PLUGIN_RUNNER_MAP = {
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
    (plugin: typeof import('@vitest/eslint-plugin').default) => ({
      ...plugin.configs.recommended.rules,
    }),
  ],
  jest: [
    'eslint-plugin-jest',
    (plugin: typeof import('eslint-plugin-jest')) => ({
      ...plugin.configs['flat/recommended'].rules,
    }),
  ],
} as const

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
            ...pluginNoOnlyTests.rules,
            ...rules(pluginRunner),
          },
        },
      },
    },
    runner === 'jest'
      ? {
          name: `${NAMESPACE}/jest`,
          ...pluginRunner.configs['flat/recommended'],
          rules: {
            ...pluginRunner.configs['flat/recommended'].rules,
          },
        }
      : {},

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
