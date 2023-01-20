import { TBill } from './Bill'

export type TCategory = {
  id?: string
  name: string
  value: number
  bills?: TBill[]
}
