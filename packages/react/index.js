const base = require('@magister_zito/eslint-config-base');

module.exports = {
	extends: [
		'@magister_zito/eslint-config-base',
		'plugin:react/all',
		'plugin:jsx-a11y/strict'
	],

	overrides: [
		...base.overrides,
		{
			env: {
				'browser': true,
				'cypress/globals': true,
				'es6': true
			},
			extends: ['plugin:cypress/recommended'],
			files: '**/cypress/**',
			rules: {
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'no-undefined': 'off',
				'sort-keys': 'off'
			}
		},
		{
			env: {
				'browser': true,
				'es6': true,
				'jest/globals': true
			},
			extends: ['plugin:jest/all', 'plugin:jest-dom/recommended'],
			files: ['**/__tests__/**', '**/test/**'],
			plugins: ['jest', 'testing-library'],
			rules: {
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'jest/no-disabled-tests': 'off',
				'jest/no-hooks': 'off',
				'jest/prefer-expect-assertions': 'off',
				'no-undefined': 'off',
				'sort-keys': 'off'
			}
		}
	],

	plugins: ['jsx-a11y', 'react-hooks'],

	rules: {
		'jsx-quotes': ['error', 'prefer-double'],
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] }
		],
		'react/jsx-indent': [
			2,
			'tab',
			{ checkAttributes: true, indentLogicalExpressions: true }
		],
		'react/jsx-max-depth': 'off',
		'react/jsx-no-bind': 'off',
		'react/jsx-no-literals': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/react-in-jsx-scope': 'off'
	},

	settings: {
		react: {
			version: '17.0'
		}
	}
};
