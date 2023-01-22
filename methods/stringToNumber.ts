export const stringToNumber = (str: string) => {
  return str.includes(',') ? parseFloat(str.replace(',', '.')) : parseFloat(str)
}
