export const convertEuroToCents = (euro: number) => Math.round(euro * 100)

export const isStringNaN = (str: string) => isNaN(str as unknown as number)

export const setCursor = (pos: number, element: HTMLInputElement) => {
  element.selectionStart = pos
  element.selectionEnd = pos
}
