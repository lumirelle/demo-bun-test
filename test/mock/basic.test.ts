import { describe, expect, it, mock } from 'bun:test'

describe('mock basic test', () => {
  it('should mock function as expected', () => {
    const mockFn = mock((x: number) => x * 2)

    // Call the mock
    const result1 = mockFn(5)
    const result2 = mockFn(10)

    // Verify calls
    expect(mockFn).toHaveBeenCalledTimes(2)
    expect(mockFn).toHaveBeenCalledWith(5)
    expect(mockFn).toHaveBeenLastCalledWith(10)

    // Check results
    expect(result1).toBe(10)
    expect(result2).toBe(20)

    // Inspect call history
    expect(mockFn.mock.calls).toEqual([[5], [10]])
    expect(mockFn.mock.results).toEqual([
      { type: 'return', value: 10 },
      { type: 'return', value: 20 },
    ])
  })
})
