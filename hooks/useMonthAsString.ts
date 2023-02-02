export const useMonthAsString = (date: number) => {
  const monthNames = [
    'styczeń',
    'luty',
    'marzec',
    'kwiecień',
    'maj',
    'czerwiec',
    'lipiec',
    'sierpień',
    'wrzesień',
    'październik',
    'listopad',
    'grudzień',
  ]
  const monthId = new Date(date).getMonth()
  return monthNames[monthId]
}
