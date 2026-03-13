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
    onMounted
  })
  onMounted(() =>{
    if(timer) {
      clearInterval(timer)
    }
  })
  return {count}
}