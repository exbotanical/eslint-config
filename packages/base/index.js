module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},

	extends: [
		'eslint:all',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:eslint-comments/recommended',
		'plugin:jsonc/recommended-with-jsonc',
		'plugin:yml/standard'
	],

	ignorePatterns: ['node_modules', 'dist', 'public', 'coverage'],

	overrides: [
		/* TypeScript and tsx */
		{
			extends: ['plugin:@typescript-eslint/all'],
			files: ['**/*.{ts,tsx}'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: 'tsconfig.json'
			},
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/ban-ts-ignore': 'off',
				'@typescript-eslint/consistent-indexed-object-style': 'off',
				'@typescript-eslint/consistent-type-imports': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/explicit-member-accessibility': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				// TODO refine
				'@typescript-eslint/indent': 'off',
				'@typescript-eslint/init-declarations': 'off',
				'@typescript-eslint/method-signature-style': 'off',
				// TODO refine
				'@typescript-eslint/naming-convention': 'off',
				'@typescript-eslint/no-empty-function': 'off',
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
				'@typescript-eslint/no-unused-vars': ['error', { args: 'after-used' }],
				'@typescript-eslint/no-use-before-define': 'off',
				'@typescript-eslint/no-empty-interface': 'off',
				'@typescript-eslint/object-curly-spacing': ['error', 'always'],
				'@typescript-eslint/prefer-function-type': 'off',
				'@typescript-eslint/prefer-nullish-coalescing': 'off',
				'@typescript-eslint/prefer-readonly-parameter-types': 'off',
				'@typescript-eslint/quotes': ['error', 'single'],
				'@typescript-eslint/restrict-plus-operands': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'@typescript-eslint/semi': ['error', 'always'],
				'@typescript-eslint/strict-boolean-expressions': 'off',
				'indent': ['error', 'tab'],
				'no-redeclare': 'off',
				'no-unused-vars': 'off',
				'object-curly-spacing': 'off',
				'quotes': 'off',
				'semi': 'off'
			}
		},

		/* JSON */
		{
			files: ['*.json', '*.json5'],
			parser: 'jsonc-eslint-parser',
			rules: {
				'comma-dangle': ['error', 'never'],
				'max-lines': 'off',
				'quote-props': ['error', 'always'],
				'quotes': ['error', 'double']
			}
		},

		/* package.json */
		{
			files: ['package.json'],
			parser: 'jsonc-eslint-parser',
			rules: {
				'jsonc/sort-keys': [
					'error',
					{
						order: [
							'name',
							'version',
							'description',
							'keywords',
							'license',
							'repository',
							'funding',
							'author',
							'type',
							'files',
							'exports',
							'main',
							'module',
							'unpkg',
							'bin',
							'scripts',
							'husky',
							'lint-staged',
							'peerDependencies',
							'peerDependenciesMeta',
							'dependencies',
							'devDependencies',
							'eslintConfig'
						],
						pathPattern: '^$'
					},
					{
						order: { type: 'asc' },
						pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$'
					}
				]
			}
		},

		/* TypeScript Declaration Files */
		{
			files: ['*.d.ts'],
			rules: {
				'import/no-duplicates': 'off'
			}
		},

		/* JavaScript */
		{
			files: ['*.js'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off'
			}
		},

		/* Tests (general) */
		{
			files: ['**/*/*.{test,spec}.{ts,tsx}'],
			rules: {
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/unbound-method': 'off'
			}
		},

		/* Cypress */
		{
			env: {
				'cypress/globals': true
			},
			extends: ['plugin:cypress/recommended'],
			files: ['**/cypress/**'],
			rules: {
				'@typescript-eslint/no-non-null-assertion': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off'
			}
		},

		/* Jest */
		{
			env: {
				'jest/globals': true
			},
			extends: ['plugin:jest/all', 'plugin:jest-dom/recommended'],
			files: ['**/__tests__/**', '**/test/**'],
			plugins: ['jest', 'testing-library'],
			rules: {
				'jest/no-disabled-tests': 'off',
				'jest/no-hooks': 'off',
				'jest/prefer-called-with': 'off',
				'jest/prefer-expect-assertions': 'off',
				'jest/require-to-throw-message': 'off',
				'jest/unbound-method': 'off'
			}
		}
	],

	plugins: ['html'],

	reportUnusedDisableDirectives: true,

	/* Base Rules */
	rules: {
		'array-bracket-spacing': ['error', 'never'],
		'array-callback-return': 'error',
		'arrow-body-style': 'off',
		'arrow-parens': ['error', 'always', { requireForBlockBody: true }],
		'block-scoped-var': 'error',
		'block-spacing': 'error',
		'brace-style': ['error', '1tbs'],
		'camelcase': 'off',
		'capitalized-comments': 'off',
		'class-methods-use-this': 'off',
		'comma-dangle': ['error', 'never'],
		'comma-spacing': ['error', { after: true, before: false }],
		'comma-style': ['error', 'last'],
		'complexity': ['off', 11],
		'consistent-return': 'off',
		'curly': ['error', 'multi-line', 'consistent'],
		'eqeqeq': 'off',
		'eslint-comments/disable-enable-pair': 'off',
		'func-call-spacing': ['off', 'never'],
		'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
		'generator-star-spacing': 'off',
		'id-length': 'off',
		'import/first': 'error',
		'import/no-mutable-exports': 'error',
		'import/no-unresolved': 'off',
		'import/order': [
			'error',
			{
				'alphabetize': {
					caseInsensitive: true,
					order: 'asc'
				},
				'groups': [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
					'type'
				],
				'newlines-between': 'always',
				'pathGroups': [
					{
						group: 'external',
						pattern: '{vue,@vue/**}',
						position: 'before'
					},
					{
						group: 'external',
						pattern: '{react,@react/**}',
						position: 'before'
					},
					{
						group: 'external',
						pattern: '{@**}',
						position: 'before'
					},
					{
						group: 'internal',
						pattern: '{@/**}',
						position: 'before'
					}
				]
			}
		],
		'indent': [
			'error',
			2,
			{ SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }
		],
		'key-spacing': ['error', { afterColon: true, beforeColon: false }],
		'line-comment-position': 'off',
		'max-len': 'off',
		'max-lines': [
			'error',
			{ max: 500, skipBlankLines: true, skipComments: true }
		],
		'max-lines-per-function': 'off',
		'max-params': 'off',
		'max-statements': 'off',
		'max-statements-per-line': 'off',
		'multiline-comment-style': 'off',
		'new-cap': 'off',
		'no-alert': 'warn',
		'no-bitwise': 'off',
		'no-case-declarations': 'error',
		'no-cond-assign': ['error', 'always'],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'no-constant-condition': 'warn',
		'no-debugger': 'error',
		'no-empty-function': 'off',
		'no-eq-null': 'off',
		'no-implicit-coercion': 'off',
		'no-inline-comments': 'off',
		'no-magic-numbers': 'off',
		'no-multi-assign': 'off',
		'no-multi-spaces': 'error',
		'no-multi-str': 'error',
		'no-negated-condition': 'off',
		'no-nested-ternary': 'off',
		'no-param-reassign': 'off',
		'no-plusplus': 'off',
		'no-restricted-syntax': [
			'error',
			'DebuggerStatement',
			'ForInStatement',
			'LabeledStatement',
			'WithStatement'
		],
		'no-return-assign': 'off',
		'no-return-await': 'off',
		'no-tabs': 'off',
		'no-ternary': 'off',
		'no-undefined': 'off',
		'no-underscore-dangle': 'off',
		'no-unmodified-loop-condition': 'off',
		'no-unused-expressions': 'off',
		'no-unused-vars': 'warn',
		'no-use-before-define': 'off',
		'no-useless-escape': 'off',
		'no-var': 'error',
		'no-void': 'off',
		'no-warning-comments': 'off',
		'no-with': 'error',
		'object-curly-spacing': ['error', 'always'],
		'object-shorthand': [
			'error',
			'always',
			{
				avoidQuotes: true,
				ignoreConstructors: false
			}
		],
		'one-var': ['error', 'never'],
		'operator-linebreak': ['error', 'after'],
		'padded-blocks': ['error', 'never'],
		'padding-line-between-statements': [
			'error',
			{ blankLine: 'always', next: 'return', prev: 'let' },
			{ blankLine: 'always', next: 'return', prev: 'const' },
			{ blankLine: 'always', next: 'return', prev: 'function' },
			{ blankLine: 'always', next: 'function', prev: 'function' },
			{ blankLine: 'always', next: 'let', prev: 'const' },
			{ blankLine: 'always', next: 'if', prev: 'const' },
			{ blankLine: 'always', next: 'const', prev: 'let' }
		],
		'prefer-arrow-callback': [
			'error',
			{
				allowNamedFunctions: false,
				allowUnboundThis: true
			}
		],
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: true
			}
		],
		'prefer-destructuring': [
			'error',
			{
				AssignmentExpression: {
					array: false,
					object: true
				},
				VariableDeclarator: {
					array: false,
					object: false
				}
			},
			{
				enforceForRenamedProperties: false
			}
		],
		'prefer-named-capture-group': 'off',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'quote-props': ['error', 'consistent-as-needed'],
		'quotes': ['error', 'single'],
		'require-await': 'off',
		'require-unicode-regexp': 'off',
		'semi': ['error', 'always'],
		'sort-keys': 'off',
		'sort-imports': 'off',
		'space-before-function-paren': 'off',
		'template-curly-spacing': 'error',
		'vars-on-top': 'error'
	},

	settings: {
		'import/resolver': {
			node: { extensions: ['.js', '.mjs', '.ts', '.d.ts'] }
		}
	}
};
