export func setupLinter(options = defaultOptions) {
  return eslintConfig([
    ...options.enableJs ? js() : {},
    ...options.enableTs ? ts() : {},
    ...options.enableJson ? ts() : {},
  ])
}


options {
  enableTs: boolean
  enableJsonc: boolean
  enableXml: boolean
  enableYaml: boolean
  enableToml: boolean
  enableMarkdown: boolean
  enableJsdoc: boolean
  enableTest: boolean
  enableReact: boolean
  enableVue: boolean
}
