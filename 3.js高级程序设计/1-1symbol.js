// Symbol.asyncIterator
// 这个符号作为一个属性表示一个方法，该方法返回对象默认的AsyncIterator,由for-wait-of语句使用
// 这个符号实现异步迭代器API的函数
// for-wait-of 循环会利用这个函数执行异步迭代操作，循环时，他们会调用以Symbol.asyncIterator为键的函数，并期望这个函数会返回一个实现迭代器API的对象，返回的对象是实现该API的AsyncGenerator
class Foo {
  async *[Symbol.asyncIterator]() {}
}
let f = new Foo();

console.log(f[Symbol.asyncIterator]())


// 技术上，这个由Symbol.asyncIterator函数生成的对象应该通过其next()方法陆续返回Promise实例
// 可以通过显式的调用next()方法返回，也可以隐式的通过异步生成器函数返回
class Emitter {
  constructor(max) {
    this.max = max;
    this.asyncIdx = 0;
  }

  async *[Symbol.asyncIterator]() {
    while(this.asyncIdx < this.max) {
      yield new Promise((resolve) => resolve(this.asyncIdx++));
    }
  }
}

async function asyncCount() {
  let emmitter = new Emitter(5);
  for await (const x of emmitter) {
    console.log(x);
  }
}

asyncCount()