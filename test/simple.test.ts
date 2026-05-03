import { describe, expect, it } from 'bun:test'

describe('simple test', () => {
  describe('addition result', () => {
    it('should be 5 if 2 + 3', () => {
      const result = 2 + 3
      expect(result).toBe(5)
    })
  })

  describe('string concatenation result', () => {
    it('should be "Hello, world!" if "Hello, " + "world!"', () => {
      const result = 'Hello, ' + 'world!'
      expect(result).toBe('Hello, world!')
    })
  })
})
