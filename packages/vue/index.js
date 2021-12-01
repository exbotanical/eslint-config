const base = require('@magister_zito/eslint-config-base');

module.exports = {
	overrides: [
		...base.overrides,
		{
			files: ['*.vue', '*.tsx'],
			parser: 'vue-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			},
			rules: {
				'no-unused-vars': 'off',
				'no-undef': 'off',
				'sort-keys': 'off',
				'@typescript-eslint/no-unused-vars': 'off'
			}
		},
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
		'plugin:vue/vue3-recommended',
		'plugin:vuejs-accessibility/recommended',
		'@magister_zito/eslint-config-base'
	],

	rules: {
		'vue/max-attributes-per-line': ['warn', { singleline: 5 }],
		'vue/html-indent': 'off',
		'vue/html-closing-bracket-newline': 'off',
		'vue/multiline-html-element-content-newline': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/html-self-closing': 'off',
		'vue/html-closing-bracket-spacing': 'off',
		'vue/require-default-prop': 'off',
		'vue/mustache-interpolation-spacing': 'off',
		'vue/no-multi-spaces': 'off',
		'vue/no-mutating-props': 'off',
		'vue/new-line-between-multi-line-property': 'error',
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
		]
	},

	ignorePatterns: ['.quasar']
};
