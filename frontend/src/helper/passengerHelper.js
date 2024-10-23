export function totalGroupCalculator(n, p) {
   return n * p
}

export function totalPriceCalculator(adultTotal, childrenTotal, infantTotal) {
   return adultTotal + childrenTotal + infantTotal
}

export const SOURCE = [
   { name: 'Cash', value: 'Cash' },
   { name: 'Credit Card', value: 'Credit Card' },
   { name: 'Voucher', value: 'Voucher' },
 ]

 export const STATUS = [
   { name: 'In Full', value: 'In Full' },
   { name: 'Partial Payment', value: 'Partial Payment' },
   { name: 'No Payment', value: 'No Payment' },
 ]

 export const RECEIVED = [{ name: 'No', value: false }, { name: 'Yes', value: true }]
 
 export const FIAT = [{ name: 'USD', value: true }, { name: 'PESO', value: false }]