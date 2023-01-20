import { createRealmContext, Realm } from "@realm/react"
import { TMonth } from "../../types/Month"
import { Month } from "./Month"
import { Category } from "./Category"
import { Bill } from "./Bill"
import { Product } from "./Product"

export class Year {
    name: string
    type: string
    value: number
    months: TMonth[]

    constructor(
        {name, type, value, months}:{name:string, type:string, value:number, months: TMonth[]}
    ) {
        this.name = name
        this.type = type
        this.value = value
        this.months = months
    }
    

    static schema = {
        name: 'Bill',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            type: 'string',
            value: 'number',
            months: 'TMonth[]'
        }
    }
}

// export const { useRealm, useQuery, RealmProvider } = createRealmContext({
//     schema: [Year.schema, Month.schema, Category.schema, Bill.schema, Product.schema]
// })