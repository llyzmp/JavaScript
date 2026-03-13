/**
 * new
 * 1. 创建一个空对象，指向构造函数的prototype
 * 2. 执行函数，并把this绑定到新对象
 * 3. 如果构造函数返回一个对象，则返回该对象，否则返回新创建的对象
 * @param {*} Constructor 
 * @param  {...any} args 
 */
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype)
  const result = Constructor.apply(obj, args)
  return (result && typeof result === 'object' || typeof result === 'function') ? result : obj
}



function Person(name, age) {
  this.name = name;
  this.age = age;
  // 没有 return 语句，默认返回 this
}

const p1 = myNew(Person, 'Alice', 25);
console.log(p1); // Person { name: 'Alice', age: 25 }
console.log(p1 instanceof Person); // true

// 构造函数返回对象
function ReturnsObject(name) {
  this.name = name;
  return { custom: true };
}
const p2 = myNew(ReturnsObject, 'Bob');
console.log(p2); // { custom: true }，而不是 ReturnsObject 的实例

// 构造函数返回函数
function ReturnsFunction() {
  return function() {};
}
const p3 = myNew(ReturnsFunction);
console.log(typeof p3); // 'function'
console.log(p3 instanceof ReturnsFunction); // false

// 构造函数返回 null
function ReturnsNull() {
  return null;
}
const p4 = myNew(ReturnsNull);
console.log(p4); // null