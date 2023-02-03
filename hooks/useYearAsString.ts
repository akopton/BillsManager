export const useYearAsString = (date: number) => {
  return new Date(date).getFullYear().toString()
}
