import { useMemo } from 'react'
import { removePolishLetters } from '../methods/removePolishLetters'
import { sortByName } from '../methods/sortByName'

export const useQuery = (arr: any[], query: string) => {
  const filteredArray: any = useMemo(() => {
    sortByName(arr)
    return arr.filter((el: { name: string }) =>
      removePolishLetters(el.name).includes(removePolishLetters(query))
    )
  }, [arr, query])

  return filteredArray
}
