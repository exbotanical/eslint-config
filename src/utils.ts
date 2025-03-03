import type { Linter } from 'eslint'
import { isPackageExists } from 'local-pkg'
import { fileURLToPath } from 'node:url'

// See: https://github.com/so1ve/eslint-parser-plain
export const parserPlain = {
  meta: {
    name: 'parser-plain',
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: 'Program',
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [],
    },
  }),
}

export async function interopDefault<T>(
  module: T | Promise<T>,
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await module
  return (resolved as any).default || resolved
}

export function renameRules(
  rules: Record<string, any>,
  map: Record<string, string>,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) => {
      for (const [from, to] of Object.entries(map)) {
        if (key.startsWith(`${from}/`))
          return [to + key.slice(from.length), value]
      }
      return [key, value]
    }),
  )
}

export function mergeProcessors(
  processors: Linter.Processor[],
): Linter.Processor {
  const cache = new Map<string, number[]>()

  return {
    meta: {
      name: `merged-processor:${processors
        .map(processor => processor.meta?.name || 'unknown')
        .join('+')}`,
    },
    supportsAutofix: true,
    preprocess(text, filename) {
      const counts: number[] = []
      cache.set(filename, counts)
      return processors.flatMap(processor => {
        const result = processor.preprocess?.(text, filename) || []
        counts.push(result.length)
        return result
      })
    },
    postprocess(messages, filename) {
      const counts = cache.get(filename)!
      cache.delete(filename)
      let index = 0
      return processors.flatMap((processor, idx) => {
        const msgs = messages.slice(index, index + counts[idx])
        index += counts[idx]
        return processor.postprocess?.(msgs, filename) || []
      })
    },
  }
}

export const processorPassThrough: Linter.Processor = {
  meta: {
    name: 'pass-through',
  },
  preprocess(text) {
    return [text]
  },
  postprocess(messages) {
    return messages[0]
  },
}

const scopeUrl = fileURLToPath(new URL('.', import.meta.url))
export function isPackageInScope(name: string): boolean {
  return isPackageExists(name, { paths: [scopeUrl] })
}
