import { describe, expect, it } from 'vitest'

import { convertEuroToCents, setCursor } from './utils'

describe('utils', () => {
  describe('convertEuroToCents()', () => {
    it('should return 123457 given 1234.567', () => {
      expect(convertEuroToCents(1234.567)).toBe(123457)
    })

    it('should return 123457 given 1234.567', () => {
      expect(convertEuroToCents(1234.564)).toBe(123456)
    })
  })

  describe('setCursor()', () => {
    it('should set cursor to position 5', () => {
      const inputElement = document.createElement('input')
      inputElement.type = 'tel'
      inputElement.value = '123,467.89'

      document.body.appendChild(inputElement)

      setCursor(5, inputElement)

      expect(inputElement.selectionStart).toBe(5)
      expect(inputElement.selectionEnd).toBe(5)
    })
  })
})
