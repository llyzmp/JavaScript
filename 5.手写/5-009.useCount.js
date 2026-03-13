import { ref, onMounted, onUnmounted } from 'vue'
export function useCount() {
  const count = ref(0)
  let timer = null
  // 开始计数
  const startCount = () =>{
    timer = setInterval(() => {
      count.value++
    }, 1000);
  }
  onMounted(() =>{
    startCount()
  })
  onMounted(() =>{
    if(timer) {
      clearInterval(timer)
    }
  })
  return {count}
}



import { useState, useEffect } from 'react'
export function useTimer() {
  const [count, setCount] = useState(0)
  useEffect(() =>{
    const timer = setInterval(() => {
      setCount((pre) => pre + 1)
    }, 1000);
    return () => clearInterval(timer)
  },[])
  return {count}
}