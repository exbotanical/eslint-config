module.exports = {
  extends: [
    'plugin:react/recommended',
    '@magister_zito/eslint-config-typescript'
  ],
  settings: {
    react: {
      version: '17.0'
    }
  },
  rules: {
    'jsx-quotes': [
      'error',
      'prefer-double'
    ]
  }
};
