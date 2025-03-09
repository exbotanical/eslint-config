import exbotanical from './src'

export default exbotanical({
  // Formatter: true,
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
  type: 'app',
  ignores: {
    files: ['**/*.d.ts', '**/fixtures'],
  },
})
