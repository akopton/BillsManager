// import { handleValuesSum } from "../methods/handleValuesSum";

// export const sample_data = {
//     year: {
//         name: '2023',
//         type: 'Year',
//         months: [
//             {
//                 name: 'styczeń',
//                 type: 'Month',
//                 value: function() {
//                     return this.categories.reduce((acc, cur) => acc + cur.value(), 0);
//                   },
//                 categories: [
//                     {
//                         name: 'spożywcze',
//                         type: 'Category',
//                         value: function() {
//                             return this.bills.reduce((acc, cur) => acc + cur.value(), 0);
//                           },
//                         bills: [
//                             {
//                                 id: 1,
//                                 name: 'lidl',
//                                 type: 'Bill',
//                                 value: function() {
//                                     return this.products.reduce((acc, cur) => acc + (cur.value*cur.count), 0);
//                                   },
//                                 products: [
//                                     {
//                                         name: 'mleko',
//                                         type: 'Product',
//                                         count: 3,
//                                         value: 3.49
//                                     }
//                                 ]
//                             },
//                             {
//                                 id: 1,
//                                 name: 'biedronka',
//                                 type: 'Bill',
//                                 value: function() {
//                                     return this.products.reduce((acc, cur) => acc + (cur.value*cur.count), 0);
//                                   },
//                                 products: [
//                                     {
//                                         name: 'płatki',
//                                         type: 'Product',
//                                         count: 1,
//                                         value: 8.99
//                                     },
//                                     {
//                                         name: 'olej',
//                                         type: 'Product',
//                                         count: 1,
//                                         value: 11.99
//                                     },
//                                     {
//                                         name: 'jogurt',
//                                         type: 'Product',
//                                         count: 5,
//                                         value: 4.19
//                                     }
//                                 ]
//                             }
//                         ]
//                     },
//                     {
//                         name: 'paliwo',
//                         type: 'Category',
//                         value: function() {
//                             return this.bills.reduce((acc, cur) => acc + cur.value(), 0);
//                         },
//                         bills: [
//                             {
//                                 id: 2,
//                                 name: 'BP',
//                                 type: 'Bill',
//                                 value: function() {
//                                     return this.products.reduce((acc, cur) => acc + (cur.value*cur.count), 0);
//                                   },
//                                 products: [
//                                     {
//                                         name: 'paliwo',
//                                         type: 'Product',
//                                         count: 1,
//                                         value: 150
//                                     }
//                                 ]
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name: 'luty',
//                 type: 'Month',
//                 value: function() {
//                     return this.categories.reduce((acc, cur) => acc + cur.value(), 0);
//                   },
//                 categories: [
//                     {
//                         name: 'dom',
//                         type: 'Category',
//                         value: function() {
//                             return this.bills.reduce((acc, cur) => acc + cur.value(), 0);
//                           },
//                         bills: [
//                             {
//                                 id: 1,
//                                 name: 'tauron',
//                                 type: 'Bill',
//                                 value: function() {
//                                     return this.products.reduce((acc, cur) => acc + (cur.value*cur.count), 0);
//                                   },
//                                 products: [
//                                     {
//                                         name: 'prąd',
//                                         type: 'Product',
//                                         count: 1,
//                                         value: 133.49
//                                     }
//                                 ]
//                             },
//                             {
//                                 id: 1,
//                                 name: 'czynsz',
//                                 type: 'Bill',
//                                 value: function() {
//                                     return this.products.reduce((acc, cur) => acc + (cur.value*cur.count), 0);
//                                   },
//                                 products: [
//                                     {
//                                         name: 'olej',
//                                         type: 'Product',
//                                         count: 1,
//                                         value: 11.99
//                                     },
//                                     {
//                                         name: 'jogurt',
//                                         type: 'Product',
//                                         count: 5,
//                                         value: 4.19
//                                     }
//                                 ]
//                             }
//                         ]
//                     },
//                     {
//                         name: 'paliwo',
//                         type: 'Category',
//                         value: function() {
//                             return this.bills.reduce((acc, cur) => acc + cur.value(), 0);
//                         },
//                         bills: [
//                             {
//                                 id: 2,
//                                 name: 'BP',
//                                 type: 'Bill',
//                                 value: function() {
//                                     return this.products.reduce((acc, cur) => acc + (cur.value*cur.count), 0);
//                                   },
//                                 products: [
//                                     {
//                                         name: 'paliwo',
//                                         type: 'Product',
//                                         count: 1,
//                                         value: 150
//                                     }
//                                 ]
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// }

export const sample_data = {
  year: {
    name: '2023',
    type: 'Year',
    months: [],
  },
}

type bill = {
  name: 'castorama'
  category: 'budowlane'
  date: '12.01.2023'
  products: product[]
}

type product = {
  type: 'Product'
  name: 'mleko'
  count?: number
  value?: number
}

// kategoria => każdy rachunek gdzie bill.category === category.name
type category = {
  name: string
  bills: bill[]
}

// miesiąc => każdy rachunek gdzie bill.date
type month = {
  name: string
  bills: bill[]
}
