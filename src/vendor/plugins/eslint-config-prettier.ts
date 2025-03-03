const specialRule = 0

// https://github.com/prettier/eslint-config-prettier/blob/main/index.js
export default {
  rules: {
    // The following rules can be used in some cases. See the README for more
    // information. These are marked with `0` instead of `"off"` so that a
    // script can distinguish them. Note that there are a few more of these
    // in the deprecated section below.
    'curly': specialRule,
    'no-unexpected-multiline': specialRule,
    'style/lines-around-comment': specialRule,
    'style/max-len': specialRule,
    'style/no-confusing-arrow': specialRule,
    'style/no-mixed-operators': specialRule,
    'style/no-tabs': specialRule,
    'style/quotes': specialRule,
    'style/js/lines-around-comment': specialRule,
    'style/js/max-len': specialRule,
    'style/js/no-confusing-arrow': specialRule,
    'style/js/no-mixed-operators': specialRule,
    'style/js/no-tabs': specialRule,
    'style/js/quotes': specialRule,
    'style/ts/lines-around-comment': specialRule,
    'style/ts/quotes': specialRule,
    'ts/lines-around-comment': specialRule,
    'ts/quotes': specialRule,
    'babel/quotes': specialRule,
    'unicorn/template-indent': specialRule,
    'vue/html-self-closing': specialRule,
    'vue/max-len': specialRule,

    // The rest are rules that you never need to enable when using Prettier.
    '@babel/object-curly-spacing': 'off',
    '@babel/semi': 'off',
    'style/array-bracket-newline': 'off',
    'style/array-bracket-spacing': 'off',
    'style/array-element-newline': 'off',
    'style/arrow-parens': 'off',
    'style/arrow-spacing': 'off',
    'style/block-spacing': 'off',
    'style/brace-style': 'off',
    'style/comma-dangle': 'off',
    'style/comma-spacing': 'off',
    'style/comma-style': 'off',
    'style/computed-property-spacing': 'off',
    'style/dot-location': 'off',
    'style/eol-last': 'off',
    'style/func-call-spacing': 'off',
    'style/function-call-argument-newline': 'off',
    'style/function-call-spacing': 'off',
    'style/function-paren-newline': 'off',
    'style/generator-star-spacing': 'off',
    'style/implicit-arrow-linebreak': 'off',
    'style/indent': 'off',
    'style/jsx-quotes': 'off',
    'style/key-spacing': 'off',
    'style/keyword-spacing': 'off',
    'style/linebreak-style': 'off',
    'style/max-statements-per-line': 'off',
    'style/multiline-ternary': 'off',
    'style/new-parens': 'off',
    'style/newline-per-chained-call': 'off',
    'style/no-extra-parens': 'off',
    'style/no-extra-semi': 'off',
    'style/no-floating-decimal': 'off',
    'style/no-mixed-spaces-and-tabs': 'off',
    'style/no-multi-spaces': 'off',
    'style/no-multiple-empty-lines': 'off',
    'style/no-trailing-spaces': 'off',
    'style/no-whitespace-before-property': 'off',
    'style/nonblock-statement-body-position': 'off',
    'style/object-curly-newline': 'off',
    'style/object-curly-spacing': 'off',
    'style/object-property-newline': 'off',
    'style/one-var-declaration-per-line': 'off',
    'style/operator-linebreak': 'off',
    'style/padded-blocks': 'off',
    'style/quote-props': 'off',
    'style/rest-spread-spacing': 'off',
    'style/semi': 'off',
    'style/semi-spacing': 'off',
    'style/semi-style': 'off',
    'style/space-before-blocks': 'off',
    'style/space-before-function-paren': 'off',
    'style/space-in-parens': 'off',
    'style/space-infix-ops': 'off',
    'style/space-unary-ops': 'off',
    'style/switch-colon-spacing': 'off',
    'style/template-curly-spacing': 'off',
    'style/template-tag-spacing': 'off',
    'style/wrap-iife': 'off',
    'style/wrap-regex': 'off',
    'style/yield-star-spacing': 'off',
    'style/member-delimiter-style': 'off',
    'style/type-annotation-spacing': 'off',
    'style/jsx-child-element-spacing': 'off',
    'style/jsx-closing-bracket-location': 'off',
    'style/jsx-closing-tag-location': 'off',
    'style/jsx-curly-newline': 'off',
    'style/jsx-curly-spacing': 'off',
    'style/jsx-equals-spacing': 'off',
    'style/jsx-first-prop-new-line': 'off',
    'style/jsx-indent': 'off',
    'style/jsx-indent-props': 'off',
    'style/jsx-max-props-per-line': 'off',
    'style/jsx-newline': 'off',
    'style/jsx-one-expression-per-line': 'off',
    'style/jsx-props-no-multi-spaces': 'off',
    'style/jsx-tag-spacing': 'off',
    'style/jsx-wrap-multilines': 'off',
    'style/indent-binary-ops': 'off',
    'style/type-generic-spacing': 'off',
    'style/type-named-tuple-spacing': 'off',
    'style/js/array-bracket-newline': 'off',
    'style/js/array-bracket-spacing': 'off',
    'style/js/array-element-newline': 'off',
    'style/js/arrow-parens': 'off',
    'style/js/arrow-spacing': 'off',
    'style/js/block-spacing': 'off',
    'style/js/brace-style': 'off',
    'style/js/comma-dangle': 'off',
    'style/js/comma-spacing': 'off',
    'style/js/comma-style': 'off',
    'style/js/computed-property-spacing': 'off',
    'style/js/dot-location': 'off',
    'style/js/eol-last': 'off',
    'style/js/func-call-spacing': 'off',
    'style/js/function-call-argument-newline': 'off',
    'style/js/function-call-spacing': 'off',
    'style/js/function-paren-newline': 'off',
    'style/js/generator-star-spacing': 'off',
    'style/js/implicit-arrow-linebreak': 'off',
    'style/js/indent': 'off',
    'style/js/jsx-quotes': 'off',
    'style/js/key-spacing': 'off',
    'style/js/keyword-spacing': 'off',
    'style/js/linebreak-style': 'off',
    'style/js/max-statements-per-line': 'off',
    'style/js/multiline-ternary': 'off',
    'style/js/new-parens': 'off',
    'style/js/newline-per-chained-call': 'off',
    'style/js/no-extra-parens': 'off',
    'style/js/no-extra-semi': 'off',
    'style/js/no-floating-decimal': 'off',
    'style/js/no-mixed-spaces-and-tabs': 'off',
    'style/js/no-multi-spaces': 'off',
    'style/js/no-multiple-empty-lines': 'off',
    'style/js/no-trailing-spaces': 'off',
    'style/js/no-whitespace-before-property': 'off',
    'style/js/nonblock-statement-body-position': 'off',
    'style/js/object-curly-newline': 'off',
    'style/js/object-curly-spacing': 'off',
    'style/js/object-property-newline': 'off',
    'style/js/one-var-declaration-per-line': 'off',
    'style/js/operator-linebreak': 'off',
    'style/js/padded-blocks': 'off',
    'style/js/quote-props': 'off',
    'style/js/rest-spread-spacing': 'off',
    'style/js/semi': 'off',
    'style/js/semi-spacing': 'off',
    'style/js/semi-style': 'off',
    'style/js/space-before-blocks': 'off',
    'style/js/space-before-function-paren': 'off',
    'style/js/space-in-parens': 'off',
    'style/js/space-infix-ops': 'off',
    'style/js/space-unary-ops': 'off',
    'style/js/switch-colon-spacing': 'off',
    'style/js/template-curly-spacing': 'off',
    'style/js/template-tag-spacing': 'off',
    'style/js/wrap-iife': 'off',
    'style/js/wrap-regex': 'off',
    'style/js/yield-star-spacing': 'off',
    'style/ts/block-spacing': 'off',
    'style/ts/brace-style': 'off',
    'style/ts/comma-dangle': 'off',
    'style/ts/comma-spacing': 'off',
    'style/ts/func-call-spacing': 'off',
    'style/ts/function-call-spacing': 'off',
    'style/ts/indent': 'off',
    'style/ts/key-spacing': 'off',
    'style/ts/keyword-spacing': 'off',
    'style/ts/member-delimiter-style': 'off',
    'style/ts/no-extra-parens': 'off',
    'style/ts/no-extra-semi': 'off',
    'style/ts/object-curly-spacing': 'off',
    'style/ts/semi': 'off',
    'style/ts/space-before-blocks': 'off',
    'style/ts/space-before-function-paren': 'off',
    'style/ts/space-infix-ops': 'off',
    'style/ts/type-annotation-spacing': 'off',
    'style/jsx/jsx-child-element-spacing': 'off',
    'style/jsx/jsx-closing-bracket-location': 'off',
    'style/jsx/jsx-closing-tag-location': 'off',
    'style/jsx/jsx-curly-newline': 'off',
    'style/jsx/jsx-curly-spacing': 'off',
    'style/jsx/jsx-equals-spacing': 'off',
    'style/jsx/jsx-first-prop-new-line': 'off',
    'style/jsx/jsx-indent': 'off',
    'style/jsx/jsx-indent-props': 'off',
    'style/jsx/jsx-max-props-per-line': 'off',
    'ts/block-spacing': 'off',
    'ts/brace-style': 'off',
    'ts/comma-dangle': 'off',
    'ts/comma-spacing': 'off',
    'ts/func-call-spacing': 'off',
    'ts/indent': 'off',
    'ts/key-spacing': 'off',
    'ts/keyword-spacing': 'off',
    'ts/member-delimiter-style': 'off',
    'ts/no-extra-parens': 'off',
    'ts/no-extra-semi': 'off',
    'ts/object-curly-spacing': 'off',
    'ts/semi': 'off',
    'ts/space-before-blocks': 'off',
    'ts/space-before-function-paren': 'off',
    'ts/space-infix-ops': 'off',
    'ts/type-annotation-spacing': 'off',
    'babel/object-curly-spacing': 'off',
    'babel/semi': 'off',
    'flowtype/boolean-style': 'off',
    'flowtype/delimiter-dangle': 'off',
    'flowtype/generic-spacing': 'off',
    'flowtype/object-type-curly-spacing': 'off',
    'flowtype/object-type-delimiter': 'off',
    'flowtype/quotes': 'off',
    'flowtype/semi': 'off',
    'flowtype/space-after-type-colon': 'off',
    'flowtype/space-before-generic-bracket': 'off',
    'flowtype/space-before-type-colon': 'off',
    'flowtype/union-intersection-spacing': 'off',
    'react/jsx-child-element-spacing': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-curly-spacing': 'off',
    'react/jsx-equals-spacing': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-multi-spaces': 'off',
    'react/jsx-tag-spacing': 'off',
    'react/jsx-wrap-multilines': 'off',
    'standard/array-bracket-even-spacing': 'off',
    'standard/computed-property-even-spacing': 'off',
    'standard/object-curly-even-spacing': 'off',
    'unicorn/empty-brace-spaces': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/number-literal-case': 'off',
    'vue/array-bracket-newline': 'off',
    'vue/array-bracket-spacing': 'off',
    'vue/array-element-newline': 'off',
    'vue/arrow-spacing': 'off',
    'vue/block-spacing': 'off',
    'vue/block-tag-newline': 'off',
    'vue/brace-style': 'off',
    'vue/comma-dangle': 'off',
    'vue/comma-spacing': 'off',
    'vue/comma-style': 'off',
    'vue/dot-location': 'off',
    'vue/func-call-spacing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-end-tags': 'off',
    'vue/html-indent': 'off',
    'vue/html-quotes': 'off',
    'vue/key-spacing': 'off',
    'vue/keyword-spacing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/multiline-ternary': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/no-extra-parens': 'off',
    'vue/no-multi-spaces': 'off',
    'vue/no-spaces-around-equal-signs-in-attribute': 'off',
    'vue/object-curly-newline': 'off',
    'vue/object-curly-spacing': 'off',
    'vue/object-property-newline': 'off',
    'vue/operator-linebreak': 'off',
    'vue/quote-props': 'off',
    'vue/script-indent': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/space-in-parens': 'off',
    'vue/space-infix-ops': 'off',
    'vue/space-unary-ops': 'off',
    'vue/template-curly-spacing': 'off',
  } as Record<string, 0 | 'off'>,
}
