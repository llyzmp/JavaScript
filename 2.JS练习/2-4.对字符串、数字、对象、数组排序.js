// 我们有内置的方法sort() 和 reverse() 用于对字符串进行排序
// 看一下数字和对象的升序和降序排序技巧
 
// 1. 排序字符串数组
const stringArr = ['Joe', 'Kapil', 'Steve', 'Musk']
// stringArr.sort()
// console.log(stringArr)  // [ 'Joe', 'Kapil', 'Musk', 'Steve' ]

// stringArr.reverse()
// console.log(stringArr)  // [ 'Musk', 'Steve', 'Kapil', 'Joe' ]


// 2. 排序数字数组

const arr = [1, 10, 5, 3, 8, 6, 2]
// arr.sort((a,b) => a-b)
// console.log(arr) // [1, 2, 3, 5, 6, 8, 10]

// arr.sort((a,b) => b-a)
// console.log(arr)  // [10, 8, 6, 5, 3, 2, 1]

// 3. 对象数组排序

const objectArr = [ 
  { first_name: 'Lazslo', last_name: 'Jamf'     },
  { first_name: 'Pig',    last_name: 'Bodine'   },
  { first_name: 'Pirate', last_name: 'Prentice' }
];

// localeCompare
// 返回一个数字表示是否 引用字符串 在排序中位于 比较字符串 的前面，后面，或者二者相同。
// 当 引用字符串 在 比较字符串 前面时返回 -1
// 当 引用字符串 在 比较字符串 后面时返回 1
// 相同位置时返回 0
objectArr.sort((a,b) => a.last_name.localeCompare(b.last_name))
console.log(objectArr);
// [
//   { first_name: 'Pig', last_name: 'Bodine' },
//   { first_name: 'Lazslo', last_name: 'Jamf' },
//   { first_name: 'Pirate', last_name: 'Prentice' }
// ]