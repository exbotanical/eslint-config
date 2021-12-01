const base = require('@magister_zito/eslint-config-base');

module.exports = {
	extends: [
		'plugin:vue/vue3-recommended',
		'plugin:vuejs-accessibility/recommended',
		'@magister_zito/eslint-config-base'
	],

	ignorePatterns: ['.quasar'],

	overrides: [
		...base.overrides,
		{
			files: ['*.vue', '*.tsx'],
			parser: 'vue-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			},
			rules: {
				'@typescript-eslint/no-unused-vars': 'off',
				'no-undef': 'off',
				'no-unused-vars': 'off',
				'sort-keys': 'off'
			}
		},
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

	rules: {
		'vue/html-closing-bracket-newline': 'off',
		'vue/html-closing-bracket-spacing': 'off',
		'vue/html-indent': 'off',
		'vue/html-self-closing': 'off',
		'vue/max-attributes-per-line': ['warn', { singleline: 5 }],
		'vue/multiline-html-element-content-newline': 'off',
		'vue/mustache-interpolation-spacing': 'off',
		'vue/new-line-between-multi-line-property': 'error',
		'vue/no-multi-spaces': 'off',
		'vue/no-mutating-props': 'off',
		'vue/order-in-components': [
			'error',
			{
				order: [
					'el',
					'name',
					'inheritAttrs',
					'functional',
					['delimiters', 'comments'],
					['components', 'directives', 'filters'],
					'mixins',
					['provide', 'inject'],
					['props', 'propsData'],
					'emits',
					'setup',
					'asyncData',
					'data',
					'computed',
					'methods',
					'watch',
					'ROUTER_GUARDS',
					'LIFECYCLE_HOOKS',
					['template', 'render'],
					'renderError'
				]
			}
		],
		'vue/require-default-prop': 'off',
		'vue/singleline-html-element-content-newline': 'off'
	}
};
