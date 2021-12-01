const base = require('@magister_zito/eslint-config-base');

module.exports = {
	extends: [
		'@magister_zito/eslint-config-base',
		'plugin:@typescript-eslint/all'
	],

	overrides: base.overrides,

	rules: {
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-redeclare': ['error'],
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/semi': ['error', 'always'],
		'indent': 'off',
		'no-redeclare': 'off',
		'no-unused-vars': 'off',
		'semi': 'off'
	}
};
