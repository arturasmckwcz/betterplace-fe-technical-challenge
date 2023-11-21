import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'

import '../../setupTests'
import MoneyInput from './MoneyInput'
import { Locales } from './utils/LocaleFormatter'

describe('<MoneyInput />', () => {
  test('should render correctly', () => {
    const { getByText, getByTestId } = render(<MoneyInput>Label</MoneyInput>)

    const labelElement = getByText(/Label/)
    const inputElement = getByTestId('money-input')

    expect(labelElement).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
  })

  describe('render correctly given locale', () => {
    describe('de-DE', () => {
      test('should show "1.234,50" given initial value 123450', () => {
        const { getByTestId } = render(<MoneyInput value={123450} locale={Locales.DeDE} />)
        const inputElement = getByTestId('money-input')

        expect(inputElement.getAttribute('value')).toBe('1.234,50')
      })
    })

    describe('en-UC', () => {
      test('should show "1,234.50" given initial value 123450', () => {
        const { getByTestId } = render(<MoneyInput value={123450} />)
        const inputElement = getByTestId('money-input')

        expect(inputElement.getAttribute('value')).toBe('1,234.50')
      })

      test('should show "1,234.567" given user input 1234.567', () => {
        const { getByTestId } = render(<MoneyInput />)
        const inputElement = getByTestId('money-input')

        fireEvent.change(inputElement, { target: { value: '1234.567' } })
        expect(inputElement.getAttribute('value')).toBe('1,234.567')
      })
    })
  })

  describe('fire "onChange" and "onBlur" with cents value', () => {
    test('should trigger onChange with correct values', async () => {
      const mockOnChange = vi.fn()

      const { getByTestId } = render(<MoneyInput onChange={mockOnChange} />)

      const inputElement = getByTestId('money-input')

      await fireEvent.change(inputElement, { target: { value: '1234.56' } })

      expect(mockOnChange.mock.lastCall[1].type).toBe('change')
      expect(mockOnChange.mock.lastCall[0]).toBe(123456)
    })

    test('should trigger onChange with NaN if it is NaN', async () => {
      const mockOnChange = vi.fn()

      const { getByTestId } = render(<MoneyInput onChange={mockOnChange} />)

      const inputElement = getByTestId('money-input')

      await fireEvent.change(inputElement, { target: { value: '12err' } })

      expect(mockOnChange.mock.lastCall[1].type).toBe('change')
      expect(mockOnChange.mock.lastCall[0]).toBe(NaN)
    })

    test('should trigger onBlur with correct values', async () => {
      const mockOnBlur = vi.fn()

      const { getByTestId } = render(<MoneyInput onBlur={mockOnBlur} />)

      const inputElement = getByTestId('money-input')

      await fireEvent.change(inputElement, { target: { value: '1234.56' } })
      await fireEvent.blur(inputElement)

      expect(mockOnBlur.mock.lastCall[1].type).toBe('blur')
      expect(mockOnBlur.mock.lastCall[0]).toBe(123456)
    })

    test('should trigger onBlur with NaN if it is NaN', async () => {
      const mockOnBlur = vi.fn()

      const { getByTestId } = render(<MoneyInput onBlur={mockOnBlur} />)

      const inputElement = getByTestId('money-input')

      await fireEvent.change(inputElement, { target: { value: '12err' } })
      await fireEvent.blur(inputElement)

      expect(mockOnBlur.mock.lastCall[1].type).toBe('blur')
      expect(mockOnBlur.mock.lastCall[0]).toBe(NaN)
    })
  })
})
