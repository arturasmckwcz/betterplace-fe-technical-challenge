import { ChangeEvent, useRef, useEffect, useState, HTMLInputTypeAttribute } from 'react'
import _styles from './MoneyInput.module.css'
import { convertEuroToCents, isStringNaN, setCursor } from '../common/utils/utils'
import LocaleFormatter, { Locales } from '../common/utils/LocaleFormatter'

interface MoneyInputProps {
  value?: number | string
  locale?: Locales
  type?: HTMLInputTypeAttribute
  onChange?: (centsValue: number, event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (centsValue: number, event: ChangeEvent<HTMLInputElement>) => void
  [key: string]: any // for other props
}

export default function MoneyInput({
  value: propValue,
  locale = Locales.EnUS,
  type = 'tel', // launches numeric keyboard on a smartphone
  onChange,
  onBlur,
  className,
  children,
  ...props
}: MoneyInputProps) {
  const lf = new LocaleFormatter(locale)
  const [cursorPos, setCursorPos] = useState<number | null>(null)
  const [inputValue, setInputValue] = useState(propValue ? lf.formatCentsToEuro(propValue) : '')
  const ref = useRef<HTMLInputElement | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _inputValue = event.target.value
    const newInputValue = lf.convertToLocale(_inputValue)

    const _cursorPos = ref.current?.selectionStart || _inputValue.length
    if (_cursorPos < _inputValue.length) {
      setCursorPos(_cursorPos + newInputValue.length - _inputValue.length)
    } else setCursorPos(null)

    setInputValue(newInputValue)

    if (onChange) onChange(lf.getCentsValue(newInputValue), event)
  }

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(lf.getCentsValue(inputValue), event)
  }

  useEffect(() => {
    if (lf.checkLocaleFormat(inputValue)) ref.current?.removeAttribute('data-error')
    else ref.current?.setAttribute('data-error', '')

    if (cursorPos !== null && ref.current) {
      setCursor(cursorPos, ref.current)
    }
  }, [inputValue])

  return (
    <label className={`${_styles['money-input__label']} ${className ? className : '\b'}`}>
      {children}
      <input
        ref={ref}
        type={type}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
        data-testid="money-input"
      />
    </label>
  )
}
