const arr = [1, 2, 0, false, true, '', ' ', undefined, null]

console.log(arr.filter(Boolean))  // [ 1, 2, true, ' ' ]