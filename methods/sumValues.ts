export const sumValues = (arr: any[]) => {
  return arr.reduce((acc, curr) => acc + curr.value, 0).toFixed(2)
}
