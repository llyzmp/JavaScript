// 这个符号作为一个属性表示一个方法，该方法决定一个构造器对象是否认可一个对象是它的实例，由instanceof操作符使用
// instanceof操作符可以用来确定一个对象实例的原型链上是否有原型

function Foo() {}
let f = new Foo();

console.log(f instanceof Foo)

class Bar {}
let b = new Bar();
console.log(b instanceof Bar)


// 在ES6中，instanceof操作符会使用Symbol.hasInstance函数来确定关系，以Symbol.hasInstance为键的函数会执行同样的操作

function Foo1() {}
let f1 = new Foo1();
console.log(Foo1[Symbol.hasInstance](f1));

class Bar1 {}
let b1 = new Bar1();
console.log(Bar1[Symbol.hasInstance](b1));