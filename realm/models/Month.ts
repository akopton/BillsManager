import { createRealmContext, Realm } from "@realm/react"
import { TCategory } from "../../types/Category"

export class Month {
    _id: Realm.BSON.ObjectId
    name: string
    type: string
    value: number
    categories: TCategory[]

    constructor(
        {id = new Realm.BSON.ObjectId(), name, type, value, categories}:{id: Realm.BSON.ObjectId, name:string, type:string, value:number, categories: TCategory[]}
    ) {
        this._id = id
        this.name = name
        this.type = type
        this.value = value
        this.categories = categories
    }
    

    static schema = {
        name: 'Bill',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            type: 'string',
            value: 'number',
            categories: 'TCategory[]',
            month: { type: 'linkingObjects', objectType: 'Year', property: 'months' }
        }
    }
}