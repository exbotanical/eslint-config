import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 60_000,
    forceRerunTriggers: [
      '**/package.json/**',
      '**/vitest.config.*/**',
      '**/vite.config.*/**',
      '**/src/**/*.ts',
      '**/test/**/*.test.ts',
      '**/test/fixtures/**',
    ],
  },
})
