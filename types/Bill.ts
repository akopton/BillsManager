import { TProduct } from './Product'

export type TBill = {
  id?: string
  name: string
  category: string
  value: number
  products: TProduct[]
  paymentDate: number
  addedAt: number
  isPaid: boolean
}
