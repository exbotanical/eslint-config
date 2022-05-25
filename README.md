# @magister_zito/eslint-config

Extensible eslint configurations for the punctilious developer.

## Packages

- `all` Aggregate of Vue, React, and Typescript-specific rulesets.
- `base` Base configuration with rulesets for markdown, yaml, json, package.json, and code.
- `javascript` Extension of `base` for JavaScript codebases.
- `react` React TypeScript rulesets. Additionally includes Cypress and accessibility rulesets.
- `typescript` TypeScript rulesets.
- `vue` Vue TypeScript rulesets. Additionally includes Cypress and accessibility rulesets.

## Usage

In .eslintrc,

```json
{
  "extends": ["@magister_zito"]
}
```

Base

```bash
pnpm add -D @magister_zito/eslint-config-base
```

```json
{
  "extends": ["@magister_zito/base"]
}
```

Javascript

```bash
pnpm add -D @magister_zito/eslint-config-javascript
```

```json
{
  "extends": ["@magister_zito/javascript"]
}
```

React

```bash
pnpm add -D @magister_zito/eslint-config-react
```

```json
{
  "extends": ["@magister_zito/react"]
}
```

TypeScript

```bash
pnpm add -D @magister_zito/eslint-config-typescript
```

```json
{
  "extends": ["@magister_zito/typescript"]
}
```

Vue

```bash
pnpm add -D @magister_zito/eslint-config-vue
```

```json
{
  "extends": ["@magister_zito/vue"]
}
```
