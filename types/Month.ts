import { TCategory } from './Category'

export type TMonth = {
    name: string,
    type: string,
    value: number,
    categories: TCategory[]
}