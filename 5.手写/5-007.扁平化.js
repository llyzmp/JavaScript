
function flatten(arr, depth = Infinity) {
  if(!Array.isArray(arr)) return arr
  return depth > 0 ?
    arr.reduce((acc,val) =>{
      return acc.concat(Array.isArray(val) && depth > 0 ? flatten(val, depth - 1) : val)
    }, []) : arr.slice()
}


// 测试用例
console.log(flatten([1, [2, [3, [4]]]])); 
// [1, 2, 3, 4]

console.log(flatten([1, [2, [3, [4]]]], 2)); 
// [1, 2, 3, [4]]

console.log(flatten([1, [2, [3, [4]]]], 1)); 
// [1, 2, [3, [4]]]

console.log(flatten([1, [2, , [3]]])); 
// [1, 2, 3]  空位被忽略

console.log(flatten([1, [2, 3], 4])); 
// [1, 2, 3, 4]

console.log(flatten([1, 2, 3])); 
// [1, 2, 3]  无需展开