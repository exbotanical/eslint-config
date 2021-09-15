const base = require('@magister_zito/eslint-config-base');

module.exports = {
	extends: [
		'@magister_zito/eslint-config-base',
		'plugin:@typescript-eslint/recommended'
	],

	overrides: base.overrides,

	rules: {
		'import/named': 'off',
		'no-tabs': 'off',

		'no-useless-constructor': 'off',
		'@typescript-eslint/semi': ['error', 'always'],
		'@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'semi' } }],
		'@typescript-eslint/type-annotation-spacing': ['error', {}],

		'indent': 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'no-redeclare': 'off',
		'@typescript-eslint/no-redeclare': 'error',

		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/ban-types': 'off'
	}
};
