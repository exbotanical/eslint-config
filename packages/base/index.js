module.exports = {
	env: {
		es6: true,
		browser: true,
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
	plugins: ['html'],
	settings: {
		'import/resolver': {
			node: { extensions: ['.js', '.mjs', '.ts', '.d.ts'] }
		}
	},
	overrides: [
		{
			files: ['**/*.{ts,tsx}'],
			extends: ['plugin:@typescript-eslint/all'],

			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: 'tsconfig.json'
			},
			rules: {
				'semi': 'off',
				'@typescript-eslint/semi': ['error', 'always'],
				'indent': 'off',
				'@typescript-eslint/indent': ['error', 'tab'],
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': 'error',
				'no-redeclare': 'off',
				'@typescript-eslint/no-redeclare': ['error'],
				'object-curly-spacing': 'off',
				'@typescript-eslint/object-curly-spacing': ['error', 'always'],
				'quotes': 'off',
				'@typescript-eslint/quotes': ['error', 'single'],

				'@typescript-eslint/no-type-alias': 'off',
				'@typescript-eslint/ban-ts-ignore': 'off',
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/no-shadow': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-empty-function': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/prefer-readonly-parameter-types': 'off',
				'@typescript-eslint/explicit-member-accessibility': 'off',
				'@typescript-eslint/no-use-before-define': 'off',
				'@typescript-eslint/consistent-indexed-object-style': 'off',
				'@typescript-eslint/prefer-function-type': 'off',
				'@typescript-eslint/init-declarations': 'off',
				'@typescript-eslint/no-unused-expressions': 'off',
				// TODO refine
				'@typescript-eslint/naming-convention': 'off',
				'@typescript-eslint/no-magic-numbers': 'off',
				'@typescript-eslint/no-parameter-properties': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				// see https://github.com/typescript-eslint/typescript-eslint/issues/1824
				'@typescript-eslint/indent': 'off',
				'@typescript-eslint/method-signature-style': 'off',
				'@typescript-eslint/strict-boolean-expressions': 'off',
				'@typescript-eslint/no-floating-promises': 'off',
				'@typescript-eslint/no-misused-promises': 'off',
				'@typescript-eslint/restrict-plus-operands': 'off',
				'@typescript-eslint/prefer-nullish-coalescing': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off'
			}
		},
		{
			files: ['*.json', '*.json5'],
			parser: 'jsonc-eslint-parser',
			rules: {
				'quotes': ['error', 'double'],
				'quote-props': ['error', 'always'],
				'comma-dangle': ['error', 'never'],
				'max-lines': 'off'
			}
		},
		{
			files: ['package.json'],
			parser: 'jsonc-eslint-parser',
			rules: {
				'jsonc/sort-keys': [
					'error',
					{
						pathPattern: '^$',
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
						]
					},
					{
						pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
						order: { type: 'asc' }
					}
				]
			}
		},
		{
			files: ['*.d.ts'],
			rules: {
				'import/no-duplicates': 'off'
			}
		},
		{
			files: ['*.js'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off'
			}
		}
	],

	rules: {
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				'alphabetize': {
					order: 'asc',
					caseInsensitive: true
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
				'pathGroups': [
					{
						pattern: '{vue,@vue/**}',
						group: 'external',
						position: 'before'
					},
					{
						pattern: '{react,@react/**}',
						group: 'external',
						position: 'before'
					},
					{
						pattern: '{@**}',
						group: 'external',
						position: 'before'
					},
					{
						pattern: '{@/**}',
						group: 'internal',
						position: 'before'
					}
				]
			}
		],
		'import/first': 'error',
		'import/no-mutable-exports': 'error',
		'import/no-unresolved': 'off',
		'sort-imports': 'off',
		'prefer-destructuring': [
			'error',
			{
				VariableDeclarator: {
					array: false,
					object: false
				},
				AssignmentExpression: {
					array: false,
					object: true
				}
			},
			{
				enforceForRenamedProperties: false
			}
		],
		'semi': ['error', 'always'],
		'space-before-function-paren': 'error',
		'curly': ['error', 'multi-line', 'consistent'],
		'quotes': ['error', 'single'],
		'quote-props': ['error', 'consistent-as-needed'],
		'no-unused-vars': 'warn',
		'no-param-reassign': 'off',
		'array-bracket-spacing': ['error', 'never'],
		'brace-style': ['error', '1tbs'],
		'block-spacing': ['error', 'always'],
		'camelcase': 'off',
		'comma-spacing': ['error', { before: false, after: true }],
		'comma-style': ['error', 'last'],
		'comma-dangle': ['error', 'never'],
		'no-tabs': 'off',
		'no-constant-condition': 'warn',
		'no-debugger': 'error',
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'no-cond-assign': ['error', 'always'],
		'func-call-spacing': ['off', 'never'],
		'key-spacing': ['error', { beforeColon: false, afterColon: true }],
		'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
		'indent': [
			'error',
			2,
			{ SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }
		],
		'no-restricted-syntax': [
			'error',
			'DebuggerStatement',
			'ForInStatement',
			'LabeledStatement',
			'WithStatement'
		],
		'object-curly-spacing': ['error', 'always'],
		'no-return-await': 'off',
		'one-var': ['error', 'never'],
		'no-ternary': 'off',

		'no-var': 'error',
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: true
			}
		],
		'prefer-arrow-callback': [
			'error',
			{
				allowNamedFunctions: false,
				allowUnboundThis: true
			}
		],
		'object-shorthand': [
			'error',
			'always',
			{
				ignoreConstructors: false,
				avoidQuotes: true
			}
		],
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'template-curly-spacing': 'error',
		'arrow-parens': ['error', 'always', { requireForBlockBody: true }],
		'generator-star-spacing': 'off',

		'array-callback-return': 'error',
		'block-scoped-var': 'error',
		'consistent-return': 'off',
		'complexity': ['off', 11],
		'no-alert': 'warn',
		'no-case-declarations': 'error',
		'no-multi-spaces': 'error',
		'no-multi-str': 'error',
		'no-with': 'error',
		'no-void': 'error',
		'no-useless-escape': 'off',
		'max-statements-per-line': 'off',
		'vars-on-top': 'error',
		'require-await': 'off',
		'no-return-assign': 'off',
		'operator-linebreak': ['error', 'after'],
		'no-use-before-define': 'off',
		'eslint-comments/disable-enable-pair': 'off',
		'eqeqeq': 'off',
		'class-methods-use-this': 'off',
		'id-length': 'off',
		'max-lines-per-function': 'off',
		'max-lines': [
			'error',
			{ max: 500, skipBlankLines: true, skipComments: true }
		],
		'no-warning-comments': 'off',
		'max-len': 'off',
		'no-empty-function': 'off',
		'padding-line-between-statements': [
			'error',
			{ blankLine: 'always', prev: 'let', next: 'return' },
			{ blankLine: 'always', prev: 'const', next: 'return' },
			{ blankLine: 'always', prev: 'function', next: 'return' },
			{ blankLine: 'always', prev: 'function', next: 'function' },
			{ blankLine: 'always', prev: 'const', next: 'let' },
			{ blankLine: 'always', prev: 'const', next: 'if' },
			{ blankLine: 'always', prev: 'let', next: 'const' }
		],
		'no-magic-numbers': 'off',
		'no-plusplus': 'off',
		'max-statements': 'off',
		'no-nested-ternary': 'off',
		'arrow-body-style': 'off',
		'capitalized-comments': 'off',
		'line-comment-position': 'off',
		'no-inline-comments': 'off',
		'no-underscore-dangle': 'off',
		'no-negated-condition': 'off',
		'no-implicit-coercion': 'off',
		'no-unmodified-loop-condition': 'off',
		'no-unused-expressions': 'off',
		'multiline-comment-style': 'off',
		'no-eq-null': 'off',
		'new-cap': 'off',
		'max-params': 'off',
		'require-unicode-regexp': 'off',
		'prefer-named-capture-group': 'off',
		'block-spacing': 'error',
		'padded-blocks': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		'quotes': ['error', 'single']
	},

	ignorePatterns: ['node_modules', 'dist', 'public'],

	reportUnusedDisableDirectives: true
};
