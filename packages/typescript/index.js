const IGNORE_PREFIX = '_'

const rules = {
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/ban-ts-ignore': 'off',
  '@typescript-eslint/comma-dangle': ['error', 'always'],
  '@typescript-eslint/consistent-indexed-object-style': 'off',
  '@typescript-eslint/consistent-type-imports': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-member-accessibility': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/indent': 'off',
  '@typescript-eslint/init-declarations': 'off',
  '@typescript-eslint/member-delimiter-style': 'off',
  '@typescript-eslint/method-signature-style': 'off',
  '@typescript-eslint/naming-convention': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-empty-interface': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-magic-numbers': 'off',
  '@typescript-eslint/no-misused-promises': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-parameter-properties': 'off',
  '@typescript-eslint/no-redeclare': ['error'],
  '@typescript-eslint/no-shadow': 'off',
  '@typescript-eslint/no-type-alias': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      args: 'after-used',
      argsIgnorePattern: `^${IGNORE_PREFIX}`,
      caughtErrorsIgnorePattern: `^${IGNORE_PREFIX}`,
      destructuredArrayIgnorePattern: `^${IGNORE_PREFIX}`,
    },
  ],
  '@typescript-eslint/no-use-before-define': 'off',
  '@typescript-eslint/object-curly-spacing': ['error', 'always'],
  '@typescript-eslint/parameter-properties': 'off',
  '@typescript-eslint/prefer-function-type': 'off',
  '@typescript-eslint/prefer-nullish-coalescing': 'off',
  '@typescript-eslint/prefer-readonly-parameter-types': 'off',
  '@typescript-eslint/quotes': ['error', 'single'],
  '@typescript-eslint/restrict-plus-operands': 'off',
  '@typescript-eslint/restrict-template-expressions': 'off',
  '@typescript-eslint/semi': ['error', 'never'],
  '@typescript-eslint/space-before-function-paren': 'off',
  '@typescript-eslint/strict-boolean-expressions': 'off',
  'comma-dangle': 'off',
  'indent': ['error', 2],
  'no-redeclare': 'off',
  'no-unused-vars': 'off',
  'object-curly-spacing': 'off',
  'quotes': 'off',
}

module.exports = {
  extends: ['@magister_zito/eslint-config-base'],
  overrides: [
    /* TypeScript and tsx */
    {
      extends: [
        '@magister_zito/eslint-config-base',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/all',
      ],
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
      },
      rules,
    },

    /* Tests (general) */
    {
      files: ['**/*/*.{test,spec}.{ts,tsx}'],
      rules: {
        ...rules,
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],

  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
    },
  },
}
