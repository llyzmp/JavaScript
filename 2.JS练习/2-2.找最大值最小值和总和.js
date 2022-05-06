// 使用reduce快速找到基本数学运算

// Arrow function
// reduce((previousValue, currentValue) => { /* ... */ } )
// reduce((previousValue, currentValue, currentIndex) => { /* ... */ } )
// reduce((previousValue, currentValue, currentIndex, array) => { /* ... */ } )
// reduce((previousValue, currentValue, currentIndex, array) => { /* ... */ }, initialValue)

// Callback function
// reduce(callbackFn)
// reduce(callbackFn, initialValue)



/**
 * reducer函数包含四个参数, 
 * previousValue: 上次调用callbackFn的返回值，在第一次调用时，如果指定了初始值initialValue, 则值为initialValue, 否则为数组中索引为0的元素Array[0]
 * currentValue: 数组中正在处理的元素，第一次调用时，如果指定了initialValue，则值为索引为0的元素array[0], 否则为array[1]
 * currentIndex: 数组中正在处理的元素的索引，若指定了初始值initialValue, 则索引号为0， 否则索引号为1
 * array: 用于遍历的数组
 */



const array = [3, 5, 1, 7, 8, 4, 2, 10]

// 1. 最大
const max = array.reduce((a, b) => a > b ? a : b)
console.log('max', max)

// 2. 最小
const min = array.reduce((a, b) => a < b ? a : b)
console.log('min', min)

// 3. 总和

const sum = array.reduce((a, b) => a + b)
console.log('sum', sum);