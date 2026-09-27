import { CustomConfig } from '../base-config'
import { interopDefault } from '../utils'

import type { AllOptions } from '../options'
import type { FlatConfigRecord } from '../types'

export class PackageJsonConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'package.json'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    return [
      this.createRuleConfig('rules', {
        files: ['**/package.json'],
        rules: {
          'jsonc/sort-array-values': [
            'error',
            {
              order: { type: 'asc' },
              pathPattern: '^files$',
            },
          ],
          'jsonc/sort-keys': [
            'error',
            {
              order: [
                'publisher',
                'name',
                'displayName',
                'type',
                'version',
                'private',
                'packageManager',
                'description',
                'author',
                'contributors',
                'license',
                'funding',
                'homepage',
                'repository',
                'bugs',
                'keywords',
                'categories',
                'sideEffects',
                'exports',
                'main',
                'module',
                'unpkg',
                'jsdelivr',
                'types',
                'typesVersions',
                'bin',
                'icon',
                'files',
                'engines',
                'activationEvents',
                'contributes',
                'scripts',
                'peerDependencies',
                'peerDependenciesMeta',
                'dependencies',
                'optionalDependencies',
                'devDependencies',
                'pnpm',
                'overrides',
                'resolutions',
                'husky',
                'simple-git-hooks',
                'lint-staged',
                'eslintConfig',
              ],
              pathPattern: '^$',
            },
            {
              order: { type: 'asc' },
              pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
            },
            {
              order: { type: 'asc' },
              pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
            },
            {
              order: ['types', 'import', 'require', 'default'],
              pathPattern: '^exports.*$',
            },
            {
              order: [
                // Client hooks only
                'pre-commit',
                'prepare-commit-msg',
                'commit-msg',
                'post-commit',
                'pre-rebase',
                'post-rewrite',
                'post-checkout',
                'post-merge',
                'pre-push',
                'pre-auto-gc',
              ],
              pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
            },
          ],
          ...this.options.overrides,
        },
      }),
    ]
  }
}

export class PackageJsonPluginConfig extends CustomConfig<AllOptions> {
  protected namespace: string = 'package.json/plugin'

  constructor(options: AllOptions = {}) {
    super(options)
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const plugin = await interopDefault(import('eslint-plugin-package-json'))
    const { recommended, stylistic } = plugin.configs

    return [
      this.createRuleConfig('rules', {
        ...recommended,
        rules: {
          ...recommended.rules,
          ...stylistic.rules,
          ...this.options.overrides,
        },
      }),
    ]
  }
}
