import { TBill } from "./Bill";

export type TCategory = {
    name: string,
    type: string,
    value: number,
    bills?: TBill[],
}