import { GLOB_TESTS } from '../filepaths'
import { interopDefault } from '../utils'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

type Runner = 'vitest' | 'jest' | 'tap'

const PLUGIN_RUNNER_MAP: Record<Runner, [string, Record<string, any>]> = {
  tap: [
    'eslint-plugin-tap',
    {
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
    },
  ],
  vitest: [
    '@vitest/eslint-plugin',
    {
      // ...vitest.configs.recommended.rules,
    },
  ],
  jest: ['eslint-plugin-jest', {}],
}

const NAMESPACE = 'exbotanical/test'

export interface OptionsTest extends AllOptions {
  /**
   * Specifies which test runner is being used (and therefore which rules will be applied).
   */
  runner: Runner
}

export async function test({
  runner = 'vitest',
  files = GLOB_TESTS,
  overrides = {},
}: OptionsTest): Promise<FlatConfigRecord[]> {
  const [plugin, rules] = PLUGIN_RUNNER_MAP[runner]

  const [pluginRunner, pluginNoOnlyTests] = await Promise.all([
    interopDefault(import(plugin)),
    // @ts-expect-error no types
    interopDefault(import('eslint-plugin-no-only-tests')),
  ] as const)

  return [
    {
      name: `${NAMESPACE}/setup`,
      plugins: {
        test: {
          ...pluginRunner,
          rules: {
            ...rules,
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
  ]
}
