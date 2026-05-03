import { describe, expect, it } from 'bun:test'

// See format specifiers list in https://bun.sh/docs/test/writing-tests#format-specifiers

function add(a: number, b: number): number {
  return a + b
}

describe('foreach test', () => {
  describe('with array testcases', () => {
    // Array testcases passed as individual arguments
    it.each([
      [3, 1, 2],
      [9, 4, 5],
    ])('should be %i if add(%i, %i)', (expected, a, b) => {
      expect(add(a, b)).toBe(expected)
    })
  })

  describe('with object testcases', () => {
    // Object testcases passed as a single argument
    it.each([
      { a: 1, b: 2, expected: 3 },
      { a: 4, b: 5, expected: 9 },
    ])('should be $expected if add($a, $b)', (data) => {
      expect(add(data.a, data.b)).toBe(data.expected)
    })
  })
})
