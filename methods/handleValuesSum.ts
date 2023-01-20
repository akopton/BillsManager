export const handleValuesSum = async (list: any[]) => {
  return list.reduce((acc, cur) => acc + cur.value, 0)
}
