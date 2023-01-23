export const numberToString = (number: number) => {
  return number.toFixed(2).toString().replace('.', ',')
}
