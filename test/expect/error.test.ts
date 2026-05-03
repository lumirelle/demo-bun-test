import { describe, expect, it } from 'bun:test'

// Notice that, bun test tracks unhandled promise rejections and errors that occur between tests.
// If such errors occur, the final exit code will be non-zero (specifically, the count of such errors),
// even if all tests pass.
//
// See https://bun.sh/docs/test/runtime-behavior#unhandled-errors

describe('error test', () => {
  it('should throw error', () => {
    expect(() => {
      throw new Error('Intentional error')
    }).toThrow('Intentional error')
  })

  it('should handle async errors', () => {
    expect(Promise.reject(new Error('Intentional error'))).rejects.toThrow('Intentional error')
  })
})
