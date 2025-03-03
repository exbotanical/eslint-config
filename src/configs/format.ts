import { interopDefault, isPackageInScope, parserPlain } from '../utils'
import { AllOptions, FlatConfigRecord } from 'dist'
import type {
  VendoredPrettierOptions,
  VendoredPrettierRuleOptions,
} from '../vendor/types/prettier'
import {
  GLOB_CSS,
  GLOB_GRAPHQL,
  GLOB_HTML,
  GLOB_LESS,
  GLOB_MARKDOWN,
  GLOB_POSTCSS,
  GLOB_SCSS,
  GLOB_SVG,
  GLOB_XML,
} from '../filepaths'
import { OptionsStyle } from '../types'
import { STYLE_DEFAULTS } from '../defaults'

export interface OptionsFormat extends AllOptions {
  css?: boolean
  html?: boolean
  xml?: boolean
  svg?: boolean
  markdown?: boolean
  graphql?: boolean
  prettierOptions?: VendoredPrettierOptions
  dprintOptions?: boolean
}

export async function format(
  options: OptionsFormat | true = {},
  style: OptionsStyle = STYLE_DEFAULTS,
): Promise<FlatConfigRecord[]> {
  if (options === true) {
    const isPrettierPluginXmlInScope = isPackageInScope('@prettier/plugin-xml')
    options = {
      css: true,
      graphql: true,
      html: true,
      markdown: true,
      svg: isPrettierPluginXmlInScope,
      xml: isPrettierPluginXmlInScope,
    }
  }

  const { indent, quotes, semi } = style

  const pluginStylistic = await interopDefault(
    import('@stylistic/eslint-plugin'),
  )
  const config = pluginStylistic.configs.customize({
    pluginName: 'style',
    jsx: style.jsx,
    commaDangle: style.commaDangle,
    indent,
    quotes,
    semi,
  })

  const prettierOptions: VendoredPrettierOptions = {
    endOfLine: 'auto',
    printWidth: 120,
    semi,
    singleQuote: quotes === 'single',
    tabWidth: typeof indent === 'number' ? indent : 2,
    trailingComma: 'all',
    useTabs: indent === 'tab',
  }

  const prettierXmlOptions: VendoredPrettierOptions = {
    xmlQuoteAttributes: 'double',
    xmlSelfClosingSpace: true,
    xmlSortAttributesByKey: false,
    xmlWhitespaceSensitivity: 'ignore',
  }

  const dprintOptions = {
    indentWidth: typeof indent === 'number' ? indent : 2,
    quoteStyle: quotes === 'single' ? 'preferSingle' : 'preferDouble',
    useTabs: indent === 'tab',
  }

  const pluginFormat = await interopDefault(import('eslint-plugin-format'))

  const configs: FlatConfigRecord[] = [
    {
      name: 'exbotanical/format/setup',
      plugins: {
        format: pluginFormat,
      },
    },
  ]

  configs.push({
    name: 'exbotanical/format/rules',
    plugins: {
      style: pluginStylistic,
    },
    rules: {
      ...config.rules,
      curly: ['error', 'all'],
    },
  })

  if (options.css) {
    configs.push(
      {
        files: [GLOB_CSS, GLOB_POSTCSS],
        languageOptions: {
          parser: parserPlain,
        },
        name: 'exbotanical/format/css',
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(prettierOptions, {
              parser: 'css',
            }),
          ],
        },
      },
      {
        files: [GLOB_SCSS],
        languageOptions: {
          parser: parserPlain,
        },
        name: 'exbotanical/format/scss',
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(prettierOptions, {
              parser: 'scss',
            }),
          ],
        },
      },
      {
        files: [GLOB_LESS],
        languageOptions: {
          parser: parserPlain,
        },
        name: 'exbotanical/format/less',
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(prettierOptions, {
              parser: 'less',
            }),
          ],
        },
      },
    )
  }

  if (options.html) {
    configs.push({
      files: [GLOB_HTML],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'exbotanical/format/html',
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(prettierOptions, {
            parser: 'html',
          }),
        ],
      },
    })
  }

  if (options.xml) {
    configs.push({
      files: [GLOB_XML],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'exbotanical/format/xml',
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(
            { ...prettierXmlOptions, ...prettierOptions },
            {
              parser: 'xml',
              plugins: ['@prettier/plugin-xml'],
            },
          ),
        ],
      },
    })
  }

  if (options.svg) {
    configs.push({
      files: [GLOB_SVG],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'exbotanical/format/svg',
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(
            { ...prettierXmlOptions, ...prettierOptions },
            {
              parser: 'xml',
              plugins: ['@prettier/plugin-xml'],
            },
          ),
        ],
      },
    })
  }

  if (options.markdown) {
    const formatter = options.markdown === true ? 'prettier' : options.markdown

    configs.push({
      files: [GLOB_MARKDOWN],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'exbotanical/format/markdown',
      rules: {
        [`format/${formatter}`]: [
          'error',
          formatter === 'prettier'
            ? mergePrettierOptions(prettierOptions, {
                embeddedLanguageFormatting: 'off',
                parser: 'markdown',
              })
            : {
                ...dprintOptions,
                language: 'markdown',
              },
        ],
      },
    })
  }

  if (options.graphql) {
    configs.push({
      files: [GLOB_GRAPHQL],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'exbotanical/format/graphql',
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(prettierOptions, {
            parser: 'graphql',
          }),
        ],
      },
    })
  }

  return configs
}

function mergePrettierOptions(
  options: VendoredPrettierOptions,
  overrides: VendoredPrettierRuleOptions = {},
): VendoredPrettierRuleOptions {
  return {
    ...options,
    ...overrides,
    plugins: [...(overrides.plugins || []), ...(options.plugins || [])],
  }
}
