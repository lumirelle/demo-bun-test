import { describe, expect, it } from 'bun:test'

let count = 0

describe('retry test', () => {
  it('should retry 3 times and pass', async () => {
    count++
    expect(count).toBe(3)
  }, { retry: 3 })
})
