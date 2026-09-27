# Code examples

The export order below follows the reading order of the explanation.

```ts
import { z } from 'zod'
import { readFile } from 'node:fs/promises'
import { a, c, b } from './letters'

// Parses the input first.
export const parse = (input: string) => input.trim()

// Then validates the parsed value.
export const validate = (value: string) => value.length > 0

export { c, a, b }

export type Result = 'ok' | 'error'
```

An export that appears above an import:

```ts
export const first = 1
import { second } from './second'
```

## BAD

This example shows what to avoid.

```js
let unused = 1
var x = [1].forEach(n => console.log(n))
function check() {
  if (x == null) return
}
```
