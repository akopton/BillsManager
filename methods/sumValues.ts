import { stringToNumber } from './stringToNumber'

export const sumValues = (arr: any[]) => {
  return arr
    .reduce(
      (acc, curr) =>
        acc +
        (typeof curr.value === 'string'
          ? stringToNumber(curr.value) || 0
          : curr.value || 0) *
          curr.count,
      0
    )
    .toFixed(2)
}
