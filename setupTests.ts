import matchers, { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'
import { afterEach, expect, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
const { JSDOM } = require('jsdom')

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
}

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const dom = new JSDOM('<!doctype html><html><body></body></html>')
global.document = dom.window.document
global.window = dom.window
