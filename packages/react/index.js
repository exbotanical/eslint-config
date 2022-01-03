const base = require('@magister_zito/eslint-config-base');

module.exports = {
	extends: [
		'@magister_zito/eslint-config-base',
		'plugin:react/all',
		'plugin:jsx-a11y/strict'
	],

	overrides: [
		...base.overrides
	],

	plugins: ['jsx-a11y', 'react-hooks'],

	rules: {
		'jsx-quotes': ['error', 'prefer-double'],
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react/forbid-component-props': 'off',
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
		'react/no-multi-comp': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 'off'
	},

	settings: {
		react: {
			version: '17.0'
		}
	}
};
