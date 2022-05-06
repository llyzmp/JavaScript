const arr = [6, 7, 3, 2, 5, 3, 2, 6, 6, 9]
const result1 = arr.filter((item, index, array) => array.indexOf(item) === index)

const result2 =[ ...new Set(arr)]
console.log(result1, result2) // [ 6, 7, 3, 2, 5, 9 ] [ 6, 7, 3, 2, 5, 9 ]
