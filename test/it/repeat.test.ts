import { describe, expect, it } from 'bun:test'

describe('repeat test', () => {
  it('should pass 20 times', () => {
    expect(Math.random()).toBeLessThan(1)
  }, { repeats: 19 }) // Total 19 + 1 (initial run) = 20 runs
})
