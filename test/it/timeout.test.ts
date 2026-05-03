import { describe, expect, it } from 'bun:test'

describe('timeout test', () => {
  it('should complete in 300ms', async () => {
    expect(await Promise.resolve(1)).toBe(1)
  }, 300)
})
