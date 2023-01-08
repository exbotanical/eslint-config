module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
    '@magister_zito/eslint-config-typescript',
  ],

  ignorePatterns: ['.quasar'],

  overrides: [
    {
      files: ['*.vue', '*.tsx'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'sort-keys': 'off',
      },
    },

    /* Cypress */
    {
      env: {
        'cypress/globals': true,
      },
      extends: ['plugin:cypress/recommended'],
      files: ['**/cypress/**'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
  ],

  rules: {
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-indent': [
      'error',
      2,
      {
        alignAttributesVertically: true,
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
      },
    ],
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': ['warn', { singleline: 5 }],
    'vue/multi-word-component-names': 'off',
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
          'renderError',
        ],
      },
    ],
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
}
