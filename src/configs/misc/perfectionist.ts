import pluginPerfectionist from 'eslint-plugin-perfectionist'

import { CustomConfig } from '../../base-config'

import type { AllOptions } from '../..'
import type { FlatConfigRecord } from '../../types'

const SORT_OPTIONS = { order: 'asc', type: 'natural' } as const

export interface OptionsPerfectionist extends AllOptions {
  /**
   * Sorts declarations whose order can carry meaning: interfaces, object types, enums,
   * classes, modules, intersection types, and `Set` elements.
   *
   * @default false
   */
  sortDeclarations?: boolean
}

export class PerfectionistConfig extends CustomConfig<OptionsPerfectionist> {
  protected namespace: string = 'misc/perfectionist'

  constructor({ sortDeclarations = false, ...rest }: OptionsPerfectionist = {}) {
    super({
      sortDeclarations,
      ...rest,
    })
  }

  protected async _rules(): Promise<FlatConfigRecord[]> {
    const { sortDeclarations = false } = this.options

    return [
      this.createRuleConfig('setup', {
        plugins: {
          perfectionist: pluginPerfectionist,
        },
        rules: {
          'perfectionist/sort-array-includes': ['error', SORT_OPTIONS],
          'perfectionist/sort-exports': ['error', SORT_OPTIONS],
          'perfectionist/sort-heritage-clauses': ['error', SORT_OPTIONS],
          'perfectionist/sort-named-exports': ['error', SORT_OPTIONS],
          'perfectionist/sort-named-imports': ['error', SORT_OPTIONS],
          'perfectionist/sort-union-types': ['error', SORT_OPTIONS],
        },
      }),
      ...(sortDeclarations
        ? [
            this.createRuleConfig('declarations', {
              rules: {
                'perfectionist/sort-classes': ['error', SORT_OPTIONS],
                'perfectionist/sort-enums': ['error', SORT_OPTIONS],
                'perfectionist/sort-interfaces': ['error', SORT_OPTIONS],
                'perfectionist/sort-intersection-types': ['error', SORT_OPTIONS],
                'perfectionist/sort-modules': ['error', SORT_OPTIONS],
                'perfectionist/sort-object-types': ['error', SORT_OPTIONS],
                'perfectionist/sort-sets': ['error', SORT_OPTIONS],
              },
            }),
          ]
        : []),
    ]
  }
}
