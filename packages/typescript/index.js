const base = require('@magister_zito/eslint-config-base');

module.exports = {
	extends: [
		'@magister_zito/eslint-config-base',
		'plugin:@typescript-eslint/all'
	],

	overrides: base.overrides,

	rules: {
		'semi': 'off',
		'@typescript-eslint/semi': ['error', 'always'],
		'indent': 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'no-redeclare': 'off',
		'@typescript-eslint/no-redeclare': ['error'],

		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
};
