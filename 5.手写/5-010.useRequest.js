import { ref } from 'vue'

export function useRequest(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url)
      if(!res.ok) {
        throw new Error('错误', res.status)
      }
      data.value = res.json()
    } catch(err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  fetchData()
  return {
    data,
    loading,
    error
  }
}