import { convertEuroToCents, isStringNaN } from './utils'

export enum Locales {
  EnUS = 'en-US',
  DeDE = 'de-DE',
}

const digitsOnly = /^\d+$/
const threeDigits = /^\d{3}$/
const threeOrLessDigits = /^\d{1,3}$/

export default class LocaleFormatter {
  private locale: string
  private decimalSeparator: string
  private groupingSeparator: string

  constructor(locale: string) {
    const formatter = new Intl.NumberFormat(locale)
    const parts = formatter.formatToParts(12345.67)

    this.decimalSeparator = parts.find((part) => part.type === 'decimal')?.value || '.'
    this.groupingSeparator = parts.find((part) => part.type === 'group')?.value || ''
    this.locale = locale
  }

  convertLocaleToJS(str: string) {
    const [whole, decimal, ...others] = str.split(this.decimalSeparator)
    return (
      (whole ? whole.replace(new RegExp(`\\${this.groupingSeparator}`, 'g'), '') : '') +
      (decimal === undefined ? '' : '.' + decimal) +
      (others.length ? this.decimalSeparator + others.join(this.decimalSeparator) : '')
    )
  }

  parseLocaleFloat(str: string | undefined) {
    return str ? parseFloat(this.convertLocaleToJS(str)) : 0
  }

  checkLocaleFormat(str: string | undefined) {
    if (str === undefined || str === '') return true

    const [whole, decimal, ...others] = str.split(this.decimalSeparator)

    if (others.length > 0) return false

    if (!(decimal === '' || decimal === undefined) && !decimal.match(digitsOnly)) return false

    if (whole) {
      const [first, ...remaining] = whole.split(this.groupingSeparator)

      if (!first?.match(threeOrLessDigits)) return false

      if (remaining.some((group) => !group.match(threeDigits))) return false
    } else return false

    return true
  }

  formatCentsToEuro(cents: number | string) {
    return isNaN(cents as unknown as number)
      ? cents + ''
      : (parseFloat(cents as unknown as string) / 100)
          .toLocaleString(this.locale)
          .split(this.decimalSeparator)
          .map((part, idx) => (idx === 0 ? part : part.padEnd(2, '0')))
          .join(this.decimalSeparator)
  }

  convertToLocale(str: string) {
    if (!str) return ''
    if (this.checkLocaleFormat(str)) return str

    const convertedToJS = this.convertLocaleToJS(str)
    return isStringNaN(convertedToJS) ? str : parseFloat(convertedToJS).toLocaleString(this.locale)
  }

  getCentsValue(str: string) {
    return isStringNaN(this.convertLocaleToJS(str)) ? NaN : convertEuroToCents(this.parseLocaleFloat(str))
  }
}
