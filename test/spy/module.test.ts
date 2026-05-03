// oxlint-disable typescript/no-require-imports
import { afterEach, describe, expect, it, spyOn } from 'bun:test'

const module = await import('../fixtures/module')
let spy = spyOn(module, 'one')

describe('mock module test', () => {
  describe('../fixtures/module', () => {
    afterEach(() => {
      spy.mockRestore()
      spy = spyOn(module, 'one')
    })

    it('should mock one() and return the mocked value 100', async () => {
      spy.mockImplementation(() => 100)

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
