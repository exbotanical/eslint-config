const base = require('@magister_zito/eslint-config-base');

module.exports = {
	overrides: [
		...base.overrides,
		{
			files: '**/cypress/**',
			extends: ['plugin:cypress/recommended'],
			env: {
				'browser': true,
				'es6': true,
				'cypress/globals': true
			},
			rules: {
				'no-undefined': 'off',
				'sort-keys': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off'
			}
		},
		{
			files: ['**/__tests__/**', '**/test/**'],
			extends: ['plugin:jest/all', 'plugin:jest-dom/recommended'],
			plugins: ['jest', 'testing-library'],
			env: {
				'browser': true,
				'es6': true,
				'jest/globals': true
			},
			rules: {
				'no-undefined': 'off',
				'sort-keys': 'off',
				'jest/no-hooks': 'off',
				'jest/no-disabled-tests': 'off',
				'jest/prefer-expect-assertions': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off'
			}
		}
	],

	extends: [
		'@magister_zito/eslint-config-base',
		'plugin:react/all',
		'plugin:jsx-a11y/strict'
	],

	settings: {
		react: {
			version: '17.0'
		}
	},

	plugins: ['jsx-a11y', 'react-hooks'],

	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-no-literals': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-max-depth': 'off',
		'react/jsx-no-bind': 'off',
		'jsx-quotes': ['error', 'prefer-double'],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] }
		],
		'react/jsx-indent': [
			2,
			'tab',
			{ checkAttributes: true, indentLogicalExpressions: true }
		]
	}
};
