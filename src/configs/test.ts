import { GLOB_TESTS } from '../filepaths'
import type { AllOptions, FlatConfigRecord } from '../types'
import { interopDefault } from '../utils'

type Runner = 'vitest' | 'jest' | 'tap'
export interface OptionsTest extends AllOptions {
  runner: Runner
}

const PLUGIN_RUNNER_MAP: Record<Runner, [string, Record<string, any>]> = {
  ['tap']: [
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
  ['vitest']: [
    '@vitest/eslint-plugin',
    {
      // ...vitest.configs.recommended.rules,
    },
  ],
  ['jest']: ['eslint-plugin-jest', {}],
}

const NAMESPACE = 'exbotanical/test' // TODO: above or below arg types?
// TODO: consistent opts/options args
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
        test: pluginRunner,
      },
    },
    {
      name: `${NAMESPACE}/rules`,
      files,
      rules: {
        ...pluginNoOnlyTests.rules,
        ...rules,
        ...overrides,
      },
    },
  ]
}
