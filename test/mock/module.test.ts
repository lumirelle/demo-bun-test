// oxlint-disable typescript/no-require-imports
import { afterEach, describe, expect, it, mock } from 'bun:test'

// Keep a copy of the original module to restore it after tests.
//
// Workaround for restoring module mock with Bun's test runner.
//
// See https://github.com/oven-sh/bun/issues/7823
// See https://github.com/oven-sh/bun/issues/7376
// See https://github.com/oven-sh/bun/pull/25844
//
// Notice that exports in ESM are passed by reference,
// this means the import result is (`===`) the module cache,
// which will be used by other modules who imports the same module,
// and also will be influenced by `mock.module()`,
// so you must spread the import result to create
// a shallow copy to avoid the influence.
const originalModule = { ...await import('../fixtures/module') }

describe('mock module test', () => {
  describe('../fixtures/module', () => {
    afterEach(async () => {
      // Re-mock the module to restore the original implementation for next test.
      await mock.module('../fixtures/module', () => originalModule)
    })

    it('should mock one() and return the mocked value 100', async () => {
      await mock.module('../fixtures/module', () => {
        return {
          // Spread the original module to keep unmocked exports intact
          ...originalModule,
          one: () => 100,
        }
      })

      const esm = await import('../fixtures/module')
      expect(esm.one()).toBe(100)

      const cjs = require('../fixtures/module') as typeof import('../fixtures/module')
      expect(cjs.one()).toBe(100)
    })

    it('should not mock two() and return the original value 2', async () => {
      const esm = await import('../fixtures/module')
      expect(esm.two()).toBe(2)

      const cjs = require('../fixtures/module') as typeof import('../fixtures/module')
      expect(cjs.two()).toBe(2)
    })

    describe('../fixtures/module without mock', () => {
      it('should not mock one() and return the original value 1', async () => {
        const esm = await import('../fixtures/module')
        expect(esm.one()).toBe(1)

        const cjs = require('../fixtures/module') as typeof import('../fixtures/module')
        expect(cjs.one()).toBe(1)
      })

      it('should not mock two() and return the original value 2', async () => {
        const esm = await import('../fixtures/module')
        expect(esm.two()).toBe(2)

        const cjs = require('../fixtures/module') as typeof import('../fixtures/module')
        expect(cjs.two()).toBe(2)
      })
    })
  })
})
