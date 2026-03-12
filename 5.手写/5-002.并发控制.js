/**
 * 并发控制
 * 并发控制通畅限制同时执行的promise数量
 * 
 */

function mapLimit(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = []
    let running = 0
    let index = 0
    const len = tasks.length

    function runTask() {
      // 如果还有任务且正字啊执行的任务数小于限制
      while(running < limit && index < len) {
        const currentIndex = index++
        const task = tasks[currentIndex]
        running++
        Promise.resolve(task()).then(result =>{
          results[currentIndex] = result
          running--
          runTask() // 尝试启动后续任务
        }).catch(err => {
          reject(err)
        })
      }
      if(results.length === len) {
        resolve(results)
      }
    }

    runTask()
  })
}

const tasks = [
  () => new Promise(resolve => {
    console.log('任务1 开始于', Date.now());
    setTimeout(() => {
      console.log('任务1 完成于', Date.now());
      resolve(1);
    }, 1000);
  }),
  () => new Promise(resolve => {
    console.log('任务2 开始于', Date.now());
    setTimeout(() => {
      console.log('任务2 完成于', Date.now());
      resolve(2);
    }, 500);
  }),
  () => new Promise(resolve => {
    console.log('任务3 开始于', Date.now());
    setTimeout(() => {
      console.log('任务3 完成于', Date.now());
      resolve(3);
    }, 5000);
  }),
];

const start = Date.now(); 
mapLimit(tasks, 2).then(results => {
  const end = Date.now();
  console.log('结果:', results);
  console.log('总耗时:', end - start, 'ms');
}); // 大约 1 秒后输出 [1,2,3]（但实际耗时约 1 秒 + 800ms，并发限制为2）