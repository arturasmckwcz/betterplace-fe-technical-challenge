import { describe, expect, it } from 'vitest'

import LocaleFormatter, { Locales } from './LocaleFormatter'

describe('LocaleFormatter', () => {
  describe('en-US', () => {
    const lf = new LocaleFormatter(Locales.EnUS)

    describe('convertLocaleToJS()', () => {
      it('should return "1234.56" given "1,234.56"', () => {
        expect(lf.convertLocaleToJS('1,234.56')).toBe('1234.56')
      })

      it('should return "1234.5.6" given "1,2,3,4.5.6"', () => {
        expect(lf.convertLocaleToJS('1,2,3,4.5.6')).toBe('1234.5.6')
      })

      it('should return "12e34.56" given "1,2e34.56"', () => {
        expect(lf.convertLocaleToJS('1,2e34.56')).toBe('12e34.56')
      })

      it('should return "1234.56," given "1,234.56,"', () => {
        expect(lf.convertLocaleToJS('1,234.56,')).toBe('1234.56,')
      })
    })

    describe('parseLocaleFloat()', () => {
      it('should return parsed number given 123,456.789 and locale "en-US"', () => {
        expect(lf.parseLocaleFloat('123,456.789')).toBe(123456.789)
      })

      it('should return 123 given 123err', () => {
        expect(lf.parseLocaleFloat('123err')).toBe(123)
      })

      it('should return 0 given undefined', () => {
        expect(lf.parseLocaleFloat(undefined)).toBe(0)
      })
    })

    describe('checkLocaleFormat()', () => {
      it('should return true given 123,456.789 and locale "en-US"', () => {
        expect(lf.checkLocaleFormat('123,456.789')).toBeTruthy()
      })

      it('should return true given 123', () => {
        expect(lf.checkLocaleFormat('123')).toBeTruthy()
      })

      it('should return true given 0.123', () => {
        expect(lf.checkLocaleFormat('0.123')).toBeTruthy()
      })

      it('should return false given 123456', () => {
        expect(lf.checkLocaleFormat('123456')).toBeFalsy()
      })

      it('should return false given 12,3', () => {
        expect(lf.checkLocaleFormat('12,3')).toBeFalsy()
      })

      it('should return false given 12_3', () => {
        expect(lf.checkLocaleFormat('12_3')).toBeFalsy()
      })

      it('should return false given 123.45.67', () => {
        expect(lf.checkLocaleFormat('123.45.67')).toBeFalsy()
      })
    })

    describe('formatCentsToEuro()', () => {
      it('should return 4.20 given 420 and locale "en-US"', () => {
        expect(lf.formatCentsToEuro(420)).toBe('4.20')
      })

      it('should return 4.20 given "420" and locale "en-US"', () => {
        expect(lf.formatCentsToEuro('420')).toBe('4.20')
      })
    })

    describe('convertToLocale()', () => {
      it('should return empty string given an empty string', () => {
        expect(lf.convertToLocale('')).toBe('')
      })

      it('should return "123,456.567" given "123456.567"', () => {
        expect(lf.convertToLocale('123456.567')).toBe('123,456.567')
      })

      it('should return "123,456.567" given "1,2345,6.567"', () => {
        expect(lf.convertToLocale('1,2345,6.567')).toBe('123,456.567')
      })

      it('should return "123err" given "123err"', () => {
        expect(lf.convertToLocale('123err')).toBe('123err')
      })
    })
  })

  describe('de-DE', () => {
    const lf = new LocaleFormatter(Locales.DeDE)

    describe('parseLocaleFloat()', () => {
      it('should return parsed number given 123.456,789 and locale "de-DE"', () => {
        expect(lf.parseLocaleFloat('123.456,789')).toBe(123456.789)
      })
    })

    describe('checkLocaleFormat()', () => {
      it('should return true given 123,456.789 and locale "de-DE"', () => {
        expect(lf.checkLocaleFormat('123.456,789')).toBeTruthy()
      })
    })

    describe('formatCentsToEuro()', () => {
      it('should return 4,20 given 420 and locale "de-DE"', () => {
        expect(lf.formatCentsToEuro(420)).toBe('4,20')
      })
    })
  })
})
