// 演示使用new关键字调用函数时发生的过程

// 1. 定义构造函数
function Person(name, age) {
  // 在构造函数中，this指向新创建的对象
  this.name = name;
  this.age = age;
  
  // 可以在构造函数中添加方法
  this.sayHello = function() {
    return `你好，我是${this.name}，今年${this.age}岁`;
  };
}

// 为构造函数的原型添加方法
Person.prototype.introduce = function() {
  return `我叫${this.name}，是一个Person实例`;
};

// 2. 使用new关键字调用构造函数
const person1 = new Person('张三', 25);
console.log(person1); // Person {name: '张三', age: 25, sayHello: [Function]}
console.log(person1.sayHello()); // 你好，我是张三，今年25岁
console.log(person1.introduce()); // 我叫张三，是一个Person实例

// 3. 验证原型链接
console.log(person1.__proto__ === Person.prototype); // true
console.log(person1 instanceof Person); // true

// 4. 如果构造函数没有显式返回对象，则返回新创建的对象
function EmptyConstructor() {
  // 没有任何代码
}
const emptyObj = new EmptyConstructor();
console.log(emptyObj); // EmptyConstructor {}

// 5. 如果构造函数返回一个对象，则返回该对象而不是新创建的对象
function ReturnObjectConstructor() {
  this.name = '这个名字不会被返回';
  // 返回一个新对象，而不是this引用的对象
  return { customValue: '我是显式返回的对象' };
}
const returnObj = new ReturnObjectConstructor();
console.log(returnObj); // { customValue: '我是显式返回的对象' }

// 6. 如果构造函数返回的是原始值（而不是对象），则忽略返回值，返回新创建的对象
function ReturnPrimitiveConstructor() {
  this.name = '这个名字会被返回';
  // 返回原始值，会被忽略
  return 123; 
}
const primitiveObj = new ReturnPrimitiveConstructor();

console.log(primitiveObj); // { name: '这个名字会被返回' }

// 实现一个自定义的new操作符
function myNew(Constructor, ...args) {
  // 1. 创建一个新对象，并将其[[Prototype]]连接到构造函数的prototype
  const obj = Object.create(Constructor.prototype);
  
  // 2. 调用构造函数，并将this绑定到新对象
  const result = Constructor.apply(obj, args);
  
  // 3. 如果构造函数返回了一个对象，则返回该对象；否则返回新创建的对象
  return (typeof result === 'object' && result !== null) ? result : obj;
}

// 使用自定义的myNew测试
console.log("\n=== 测试自定义的myNew函数 ===");

// 测试普通构造函数
const person2 = myNew(Person, '李四', 30);
console.log(person2); // 应该返回Person实例
console.log(person2.sayHello()); // 你好，我是李四，今年30岁
console.log(person2.introduce()); // 我叫李四，是一个Person实例
console.log(person2 instanceof Person); // true

// 测试返回对象的构造函数
const returnObj2 = myNew(ReturnObjectConstructor);
console.log(returnObj2); // { customValue: '我是显式返回的对象' }

// 测试返回原始值的构造函数
const primitiveObj2 = myNew(ReturnPrimitiveConstructor);
console.log(primitiveObj2); // { name: '这个名字会被返回' }

// 总结：使用new调用函数时会发生以下步骤：
// 1. 创建一个新对象
// 2. 将新对象的[[Prototype]]连接到构造函数的prototype属性
// 3. 将构造函数内部的this绑定到新创建的对象
// 4. 执行构造函数的代码
// 5. 如果函数没有返回对象，则返回新创建的对象


// Object.create(Constructor.prototype) 作用：
// 创建一个新对象，该对象的原型（__proto__）指向 Constructor.prototype
// 这建立了对象与构造函数原型之间的继承关系
// 新对象能访问构造函数原型上的所有方法和属性
// 这步模拟了 new 操作符创建对象时建立的原型链接

// person1 instanceof Person 解释：
// instanceof 运算符检查对象的原型链中是否包含构造函数的 prototype
// 当 person1.proto === Person.prototype 时，返回 true
// 用于验证对象是否由特定构造函数创建
// 也能检测继承关系（如果是子类实例，对父类的 instanceof 检查也会返回 true）
