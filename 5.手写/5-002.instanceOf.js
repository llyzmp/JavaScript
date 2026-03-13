/**
 * 检测一恶搞对象是否在另一个构造函数的原型链上
 * 获取对象的原型链，并且不断往上查找，直到找到与构造函数的prototype属性相等的原型对象
 * 
 * @param {*} obj 
 * @param {*} constructor 
 */
function myInstanceof(obj, constructor) {
  if(typeof constructor !== 'function') {
    throw new TypeError('参数异常')
  }
  if(obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return false
  }
  // 获取构造函数的prototype对象
  const prototype = constructor.prototype
  // 获取obj的原型
  let proto = Object.getPrototypeOf(obj)
  while(proto !== null) {
    if(proto === prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

function Person(name) {
  this.name = name;
}
const p = new Person('Alice');

console.log(myInstanceof(p, Person));      // true
console.log(myInstanceof(p, Object));      // true
console.log(myInstanceof(p, Array));       // false

// 原始类型
console.log(myInstanceof(123, Number));    // false
console.log(myInstanceof(null, Object));   // false

// 跨窗口场景（简单版本无法处理，实际 instanceof 会受不同全局环境影响）