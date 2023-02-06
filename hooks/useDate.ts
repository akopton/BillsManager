export const useDate = (props: number) => {
  const newDate = new Date(props)
  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`
  const month =
    newDate.getMonth() < 10
      ? `0${newDate.getMonth() + 1}`
      : `${newDate.getMonth() + 1}`
  const year = `${newDate.getFullYear()}`

  const dateToShow = day + '.' + month + '.' + year

  return dateToShow
}
