module.exports = {
	overrides: [
		{
			files: ['*.vue'],
			parser: 'vue-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			},
			rules: {
				'no-unused-vars': 'off',
				'no-undef': 'off',
				'@typescript-eslint/no-unused-vars': 'off'
			}
		}
	],
	extends: [
		'plugin:vue/vue3-recommended',
		'@magister_zito/eslint-config-typescript'
	],
	rules: {
		'no-tabs': 'off',
		'indent': ['error', 'tab'],

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
		],

		'no-useless-escape': 'off',
		'no-irregular-whitespace': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'standard/no-callback-literal': 'off',
		'generator-star-spacing': 'off',
		'import/no-webpack-loader-syntax': 'off',
		'padded-blocks': 'off'
	}
};
