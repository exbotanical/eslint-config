const base = require('@magister_zito/eslint-config-base');

module.exports = {
	overrides: base.overrides,

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
