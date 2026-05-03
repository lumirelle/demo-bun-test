import { afterEach, describe, expect, it, spyOn } from 'bun:test'

const math = {
  multiplyBy2(x: number) {
    return x * 2
  },
}
let spy = spyOn(math, 'multiplyBy2')

describe('spy basic test', () => {
  // Spy is applying on the source directly, so spies on the same source are the same,
  // which means `spy(source, 'property') === spy(source, 'property')` is true.
  //
  // We need to use `spyFn.mockRestore()` to remove the spy from source entirely,
  // and then re-spy for next test.
  afterEach(() => {
    spy.mockRestore()
    spy = spyOn(math, 'multiplyBy2')
  })

  it('should spy on math.multiplyBy2 and change its implementation', () => {
    spy.mockImplementation((x) => {
      return x * 3
    })

    // Call the spy with mocked implementation
    const result1 = spy(5)
    const result2 = spy(10)

    // Verify calls
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(5)
    expect(spy).toHaveBeenLastCalledWith(10)

    // Check results
    expect(result1).toBe(15)
    expect(result2).toBe(30)

    // Inspect call history
    expect(spy.mock.calls).toEqual([[5], [10]])
    expect(spy.mock.results).toEqual([
      { type: 'return', value: 15 },
      { type: 'return', value: 30 },
    ])
  })

  it('should spy on math.multiplyBy2 without changing implementation', () => {
    // Call the spy
    const result1 = spy(5)
    const result2 = spy(10)

    // Verify calls
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(5)
    expect(spy).toHaveBeenLastCalledWith(10)

    // Check results
    expect(result1).toBe(10)
    expect(result2).toBe(20)

    // Inspect call history
    expect(spy.mock.calls).toEqual([[5], [10]])
    expect(spy.mock.results).toEqual([
      { type: 'return', value: 10 },
      { type: 'return', value: 20 },
    ])
  })
})
