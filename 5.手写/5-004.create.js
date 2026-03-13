
function create(proto) {
  if(proto === null || typeof proto !== 'object') {
    throw new TypeError('参数错误')
  }
  function F(){}
  F.prototype = proto
  return new F()
}