import { VAR_IGNORE_PATTERN } from '../common'
import { GLOB_TS, GLOB_TSX } from '../filepaths'
import { interopDefault, renameRules } from '../utils'

import type { AllOptions, OptionsTypeScriptParser } from '../options'
import type { FlatConfigRecord } from '../types'
import type { ParserOptions } from '@typescript-eslint/parser'

export interface OptionsTypescript extends AllOptions, OptionsTypeScriptParser {
  /**
   * Overrides type aware rules.
   */
  typeAwareOverrides?: FlatConfigRecord['rules']
}

const NAMESPACE = 'exbotanical/typescript'

export async function typescript(
  options: OptionsTypescript = {},
): Promise<FlatConfigRecord[]> {
  const {
    type = 'app',
    parserOptions = {},
    overrides = {},
    typeAwareOverrides = {},
    ignoresTypeAware = [],
  } = options
  const files = options.files ?? [GLOB_TS, GLOB_TSX]
  const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX]
  const tsconfigPath = options?.tsconfigPath
  const isTypeAware = !!tsconfigPath

  const typeAwareRules: FlatConfigRecord['rules'] = {
    'dot-notation': ['off'],
    'no-implied-eval': ['off'],
    'ts/await-thenable': ['error'],
    'ts/dot-notation': ['error', { allowKeywords: true }],
    'ts/no-floating-promises': ['error'],
    'ts/no-for-in-array': ['error'],
    'ts/no-implied-eval': ['error'],
    'ts/no-misused-promises': ['error'],
    'ts/no-unnecessary-type-assertion': ['error'],
    'ts/no-unsafe-argument': ['error'],
    'ts/no-unsafe-assignment': ['error'],
    'ts/no-unsafe-call': ['error'],
    'ts/no-unsafe-member-access': ['error'],
    'ts/no-unsafe-return': ['error'],
    'ts/promise-function-async': ['error'],
    'ts/restrict-plus-operands': ['error'],
    'ts/restrict-template-expressions': ['error'],
    'ts/return-await': ['error', 'in-try-catch'],
    'ts/strict-boolean-expressions': [
      'error',
      { allowNullableBoolean: true, allowNullableObject: true },
    ],
    'ts/switch-exhaustiveness-check': ['error'],
    'ts/unbound-method': ['error'],
  }

  const [plugin, parser] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  function makeParser(
    typeAware: boolean,
    files: string[],
    ignores: string[] = [],
  ): FlatConfigRecord {
    return {
      name: `${NAMESPACE}/${typeAware ? 'type-aware-parser' : 'parser'}`,
      files,
      ignores,
      languageOptions: {
        parser,
        parserOptions: {
          sourceType: 'module',
          ...(typeAware
            ? {
                projectService: {
                  allowDefaultProject: ['./*.js'],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {}),
          ...parserOptions,
        } as ParserOptions,
      },
    }
  }

  return [
    {
      name: `${NAMESPACE}/setup`,
      plugins: {
        ts: plugin as any,
      },
    },
    makeParser(false, files),
    ...(isTypeAware
      ? [makeParser(true, filesTypeAware, ignoresTypeAware)]
      : []),
    {
      name: `${NAMESPACE}/rules`,
      files,
      rules: {
        ...renameRules(
          plugin.configs['eslint-recommended'].overrides![0].rules!,
          { '@typescript-eslint': 'ts' },
        ),
        ...renameRules(plugin.configs.strict.rules!, {
          '@typescript-eslint': 'ts',
        }),
        'no-dupe-class-members': ['off'],
        'no-redeclare': ['off'],
        'no-use-before-define': ['off'],
        'no-useless-constructor': ['off'],
        'ts/ban-ts-comment': [
          'error',
          { 'ts-expect-error': 'allow-with-description' },
        ],
        'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],

        // See: https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        'ts/method-signature-style': ['error', 'property'],
        'ts/no-dupe-class-members': ['error'],
        'ts/no-dynamic-delete': ['off'],
        'ts/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        'ts/no-explicit-any': ['warn'],
        'ts/no-extraneous-class': ['off'],
        'ts/no-import-type-side-effects': ['error'],
        'ts/no-invalid-void-type': ['error'],
        'ts/no-non-null-assertion': ['error'],
        'ts/no-redeclare': ['error', { builtinGlobals: false }],
        'ts/no-require-imports': ['error'],
        'ts/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          },
        ],
        'ts/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'all',
            argsIgnorePattern: VAR_IGNORE_PATTERN,
            caughtErrorsIgnorePattern: VAR_IGNORE_PATTERN,
            destructuredArrayIgnorePattern: VAR_IGNORE_PATTERN,
            reportUsedIgnorePattern: true,
          },
        ],
        'ts/no-use-before-define': [
          'error',
          { classes: false, functions: false, variables: true },
        ],
        'ts/no-useless-constructor': ['error'],
        'ts/no-wrapper-object-types': ['error'],
        'ts/triple-slash-reference': ['off'],
        'ts/unified-signatures': ['off'],

        ...(type === 'lib'
          ? {
              'ts/explicit-function-return-type': [
                'error',
                {
                  allowExpressions: true,
                  allowHigherOrderFunctions: true,
                  allowIIFEs: true,
                },
              ],
            }
          : {}),
        ...overrides,
      },
    },
    ...(isTypeAware
      ? [
          {
            name: `${NAMESPACE}/rules-type-aware`,
            files: filesTypeAware,
            ignores: ignoresTypeAware,
            rules: {
              ...typeAwareRules,
              ...typeAwareOverrides,
            },
          },
        ]
      : []),
  ]
}
