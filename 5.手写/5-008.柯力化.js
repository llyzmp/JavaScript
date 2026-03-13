function curry(fn) {
  return function curried(...args) {
    if(args.length >= fn.lenth) {
      fn.apply(this, args)
    }else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

// 使用示例
function add(a, b, c) {
  return a + b + c
}

const curriedAdd = curry(add)
console.log(curriedAdd(1)(2)(3)) // 6
console.log(curriedAdd(1, 2)(3)) // 6
console.log(curriedAdd(1)(2, 3)) // 6