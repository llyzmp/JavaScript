function unique(array) {
  // 方法一
  // return [...new Set(array)]
  // 方法2
  // return array.filter((item, index) => array.indexOf(item) === index)
  // 方法3
  const map = new Map()
  return array.filter((item) => !map.has(item) && map.set(item, true))
}