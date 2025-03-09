import { isPackageExists } from 'local-pkg'

import { GLOB_SRC, GLOB_TS, GLOB_TSX } from '../filepaths'
import { interopDefault } from '../utils'

import type { AllOptions, OptionsTypeScriptParser } from '../options'
import type { FlatConfigRecord } from '../types'

const REACT_REFRESH_ALLOW_CONSTANT_EXPORT_PACKAGES = ['vite']

const REACT_ROUTER_PACKAGES = [
  '@react-router/node',
  '@react-router/react',
  '@react-router/serve',
  '@react-router/dev',
]

const NAMESPACE = 'exbotanical/react'

export interface OptionsReact extends AllOptions, OptionsTypeScriptParser {}

export async function react({
  files = [GLOB_SRC],
  filesTypeAware = [GLOB_TS, GLOB_TSX],
  ignoresTypeAware = [],
  overrides = {},
  tsconfigPath,
}: OptionsReact): Promise<FlatConfigRecord[]> {
  // TODO: Confirm deps, install if not

  const isTypeAware = !!tsconfigPath
  const typeAwareRules: FlatConfigRecord['rules'] = {
    'react/no-leaked-conditional-rendering': 'warn',
  }

  const [pluginReact, pluginReactHooks, pluginReactRefresh] = await Promise.all(
    [
      interopDefault(import('@eslint-react/eslint-plugin')),
      interopDefault(import('eslint-plugin-react-hooks')),
      interopDefault(import('eslint-plugin-react-refresh')),
    ] as const,
  )

  const isAllowConstantExport =
    REACT_REFRESH_ALLOW_CONSTANT_EXPORT_PACKAGES.some(index => isPackageExists(index))
  const isUsingReactRouter = REACT_ROUTER_PACKAGES.some(index => isPackageExists(index))

  const plugins = pluginReact.configs.all.plugins
  return [
    {
      name: `${NAMESPACE}/setup`,
      plugins: {
        'react': plugins['@eslint-react'],
        'react-dom': plugins['@eslint-react/dom'],
        'react-hooks': pluginReactHooks,
        'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
        'react-naming-convention': plugins['@eslint-react/naming-convention'],
        'react-refresh': pluginReactRefresh,
        'react-web-api': plugins['@eslint-react/web-api'],
      },
    },
    {
      name: `${NAMESPACE}/rules`,
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: 'module',
      },
      rules: {
        // Recommended rules from @eslint-react/dom
        'react-dom/no-children-in-void-dom-elements': 'warn',
        'react-dom/no-dangerously-set-innerhtml': 'warn',
        'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
        'react-dom/no-find-dom-node': 'error',
        'react-dom/no-missing-button-type': 'warn',
        'react-dom/no-missing-iframe-sandbox': 'warn',
        'react-dom/no-namespace': 'error',
        'react-dom/no-render-return-value': 'error',
        'react-dom/no-script-url': 'warn',
        'react-dom/no-unsafe-iframe-sandbox': 'warn',
        'react-dom/no-unsafe-target-blank': 'warn',

        // Recommended rules react-hooks
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        // React refresh
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: isAllowConstantExport,
            allowExportNames: [
              ...(isUsingReactRouter
                ? ['meta', 'links', 'headers', 'loader', 'action']
                : []),
            ],
          },
        ],
        // Recommended rules from @eslint-react/web-api
        'react-web-api/no-leaked-event-listener': 'warn',

        'react-web-api/no-leaked-interval': 'warn',
        'react-web-api/no-leaked-resize-observer': 'warn',

        'react-web-api/no-leaked-timeout': 'warn',

        // Recommended rules from @eslint-react
        'react/ensure-forward-ref-using-ref': 'warn',
        'react/jsx-no-duplicate-props': 'warn',
        'react/jsx-uses-vars': 'warn',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-children-count': 'warn',
        'react/no-children-for-each': 'warn',
        'react/no-children-map': 'warn',
        'react/no-children-only': 'warn',
        'react/no-children-to-array': 'warn',
        'react/no-clone-element': 'warn',
        'react/no-comment-textnodes': 'warn',
        'react/no-component-will-mount': 'error',
        'react/no-component-will-receive-props': 'error',
        'react/no-component-will-update': 'error',
        'react/no-context-provider': 'warn',
        'react/no-create-ref': 'error',
        'react/no-default-props': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-duplicate-key': 'error',
        'react/no-forward-ref': 'warn',
        'react/no-implicit-key': 'warn',
        'react/no-missing-key': 'error',
        'react/no-nested-components': 'error',
        'react/no-prop-types': 'error',
        'react/no-redundant-should-component-update': 'error',
        'react/no-set-state-in-component-did-mount': 'warn',
        'react/no-set-state-in-component-did-update': 'warn',
        'react/no-set-state-in-component-will-update': 'warn',
        'react/no-string-refs': 'error',
        'react/no-unsafe-component-will-mount': 'warn',
        'react/no-unsafe-component-will-receive-props': 'warn',
        'react/no-unsafe-component-will-update': 'warn',
        'react/no-unstable-context-value': 'warn',
        'react/no-unstable-default-props': 'warn',
        'react/no-unused-class-component-members': 'warn',
        'react/no-unused-state': 'warn',
        'react/prefer-destructuring-assignment': 'warn',
        'react/prefer-shorthand-boolean': 'warn',
        'react/prefer-shorthand-fragment': 'warn',

        ...overrides,
      },
    },
    ...(isTypeAware
      ? [
          {
            name: `${NAMESPACE}/type-aware-rules`,
            files: filesTypeAware,
            ignores: ignoresTypeAware,
            rules: {
              ...typeAwareRules,
            },
          },
        ]
      : []),
  ]
}
