/**
 * 类数组转换成数组
 * @param {*} arrayLike 
 */
function toArray(arrayLike) {
  if(arrayLike === null) throw new TypeError('参数异常')
  return Array.from(arrayLike)
}