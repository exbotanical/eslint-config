import exbotanical from './src'

export default exbotanical({
  markdown: true,
  jsonc: true,
  react: true,
  vue: true,
  yaml: true,
  typescript: {
    overrides: {
      'ts/no-non-null-assertion': 'off',
      'ts/no-explicit-any': 'off',
    },
  },
  toml: true,
  test: true,
  graphql: true,
  formatter: true,
  type: 'app',
  ignores: ['**/*.d.ts', '**/fixtures'],
})
