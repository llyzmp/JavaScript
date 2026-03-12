

class MyPromise {
  constructor(executor) {
    this.state = 'pending' // 初始状态
    this.value = undefined // 成功的值
    this.reason = undefined // 失败的原因
    this.onFullfilledCallbacks = [] // 存储成功的回调
    this.onRejectedCallbacks = [] // 存储失败回调
    // 定义resolve
    const resolve = (value) => {
      // 只有pending状态才能改变
      if(this.state === 'pending') {
        this.state = 'fufilled'
        this.value = value
        // 依次执行所有成功回调
        this.onFullfilledCallbacks.forEach(fn => fn())
      }
    }
    // 定义reject 函数
    const reject = (reason) => {
      if(this.state === 'pending'){
        this.state = 'rejected'
        this.reason = reason
        // 依次执行所有失败回调
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    // 立即执行executor
    try {
      executor(resolve, reject)
    } catch(err) {
      reject(err)
    }
  }
  // 两个可选参数 onFulfilled 和onRejected，分别在fulfilled或者rejected时调用
  // 如果调用then时，promise 已经完成或者拒绝，应该立即执行对应的回调
  // 如果还处于pending 则需要将回调存起来，等到状态变更时在执行
  // 需要再构造函数中添加两个数组，分别存储成功和失败回调
  then(onFulfilled, onRejected) {
    // 判断参数是否为函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected  : reason => { throw reason }
    // then的链式调用，创建一个新的Promise实例

    const promise2 = new MyPromise((resolve, reject) =>{
      if(this.state === 'fulfilled') {
        // 如果成功，异步执行onFulfilled 规范要求异步
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      } else if (this.state === 'rejected') {
        // 如果失败，异步执行onRejected
        queueMicrotask(()=>{
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      } else {
        // 如果是pending 将回调存起来，保证异步执行
        this.onFullfilledCallbacks.push(() =>{
          queueMicrotask(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(() =>{
          queueMicrotask(() =>{
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
  // 实现catch
  catch(onRejected){
    return this.then(null, onRejected)
  }
  // 静态方法
  static resolve(value) {
    return new MyPromise((resolve) => resolve(value))
  }
  // 静态方法
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason))
  }
  // race
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      // 遍历传入可迭代的对象
      for(let p of promises) {
        // 包装成MyPromises实例
        MyPromise.resolve(p).then(resolve, reject)
        // 一旦任何一个完成或者失败，就会调用外层的resolve/reject
      }
    })
  }
  // 全部成功才成功
  static all(promises) {
    return MyPromise((resolve, reject) =>{
      if(!Array.isArray(promises)) {
        return reject(new TypeError('promise must be an array'))
      }
      const len = promises.length
      if(len === 0) {
        return resolve([])
      }
      const results = new Array(len)
      let count = 0
      for(let i = 0; i < len; i++) {
        MyPromise.resolve(promises[i]).then(value => {
          results[i] = value
          count++
          if(count === len) resolve(results)
        }, reject)
      }
    })
  }
  // 只要有一个成功才成功，所有失败才失败
  static any(promises) {
    return new MyPromise((resolve, reject) =>{
      if(!Array.isArray(promises)) {
        return reject(new TypeError('promises must be an array'))
      }
      const len = promises.length
      if(len === 0) {
        // 按照规范返回一个AggregateError
        const error = new Error('All promises were rejected')
        error.name = 'AggregateError'
        err.errors=[]
        return reject(error)
      }
      const errors = new Array(len)
      let count = 0;
      for(let i = 0; i < len; i++) {
        MyPromise.resolve(promises[i]).then(value => {
          resolve(value) // 只有一个成功就resolve
        }, reason => {
          errors[i] = reason;
          count++
          if(count === len) {
            // 全部失败
            const error = new Error('All promises were rejected')
            error.name='AggregateError'
            error.errors = errors
            reject(error)
          }
        })
      }
    })
  }
  // 等待所有Promise完成，无论成功或失败
  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      if(!Array.isArray(promises)) {
        return reject(new TypeError('promise must be an array'))
      }
      const len = promises.length
      if(len === 0) {
        return resolve([])
      }
      let count = 0
      for(let i = 0; i < len; i++) {
        MyPromise.resolve(promises[i].then(value => {
          results[i] = { status: 'fulfilled', value }
        })).catch(reason => {
          results[i] = { status: 'rejected', reason }
        }).finally(() =>{
          count++
          if(count === len) {
            resolve(results)
          }
        })
      }
    })
  }
}
/**
 * 核心
 * 1. 如果promise2 和x是同一个对象，抛出异常，防止循环引用
 * 2. 如果x是一个promise(或者thenable),则采用他的状态： 取他的then方法并调用，用它的结果决定promise2的状态
 * 3. 如果x是普通值，直接resolve(x)
 * 4. 要确保x的方法只能被调用一次
 * @param {*} promise2 
 * @param {*} x 
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 防止死循环，  如果promise2 和x是同一个对象，抛出typeError
  if(promise2 === x) {
    return reject(new TypeError('Chain cycle detected for promise'))
  }
  // 标记是否已经调用过，防止多次调用
  let called = false

  if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // 取出x.then方法
      let then = x.then
      if(typeof then === 'function') {
        // 说明x是一个thenable, 调用它
        then.call(x, (y) => {
          if(called) return
          called = true
          // 递归解析y
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if(called) return
          called = true
          reject(r)
        })
      } else {
        // 普通对象, 直接resolve
        resolve(x)
      }
    }catch(e) {
      if(called) return
      called = true
      reject(e)
    }
  } else {
    // x是普通值
    resolve(x)
  }

}


const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

p.then(value => {
  console.log(value); // 1
  return value + 1;
}).then(value => {
  console.log(value); // 2
  throw new Error('出错了');
}).catch(err => {
  console.log(err.message); // 出错了
});

MyPromise.resolve(42).then((value) => console.log(value)); // 42