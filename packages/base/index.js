module.exports = {
	env: {
		es6: true,
		browser: true,
		node: true
	},
	extends: [
		'standard',
		'plugin:import/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:jsonc/recommended-with-jsonc',
		'plugin:yml/standard'
	],
	plugins: [
		'html'
	],
	settings: {
		'import/resolver': {
			node: { extensions: ['.js', '.mjs', '.ts', '.d.ts'] }
		}
	},
	overrides: [
		{
			files: ['*.json', '*.json5'],
			parser: 'jsonc-eslint-parser',
			rules: {
				'quotes': ['error', 'double'],
				'quote-props': ['error', 'always'],
				'comma-dangle': ['error', 'never']
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
		'import/order': 'error',
		'import/first': 'error',
		'import/no-mutable-exports': 'error',
		'import/no-unresolved': 'off',
		'import/no-absolute-path': 'off',

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
		'no-constant-condition': 'warn',
		'no-debugger': 'error',
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'no-cond-assign': ['error', 'always'],
		'func-call-spacing': ['off', 'never'],
		'key-spacing': ['error', { beforeColon: false, afterColon: true }],
		'indent': ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
		'no-restricted-syntax': [
			'error',
			'DebuggerStatement',
			'ForInStatement',
			'LabeledStatement',
			'WithStatement'
		],
		'object-curly-spacing': ['error', 'always'],
		'no-return-await': 'off',

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
		'vars-on-top': 'error',
		'require-await': 'off',
		'no-return-assign': 'off',
		'operator-linebreak': ['error', 'after'],
		'no-use-before-define': 'off',
		'eslint-comments/disable-enable-pair': 'off',
		'eqeqeq': 'off'
	},

	reportUnusedDisableDirectives: true
};
