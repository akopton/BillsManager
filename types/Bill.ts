import { TProduct } from "./Product"

export type TBill = {
    id: number,
    name: string,
    type: string,
    value: Function,
    products: any[]
}