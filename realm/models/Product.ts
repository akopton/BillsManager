import { createRealmContext, Realm } from "@realm/react"
export class Product {
    name: string
    type: string
    count: number
    value: number

    constructor(
        {name, type, count, value}:{name:string, type:string, count:number, value:number}
    ) {
        this.name = name
        this.type = type
        this.count = count
        this.value = value
    }
    

    static schema = {
        name: 'Product',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            type: 'string',
            count: 'number',
            value: 'number',
            bill: { type: 'linkingObjects', objectType: 'Bill', property: 'products' }
        }
    }
}