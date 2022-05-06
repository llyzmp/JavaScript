// reduce

let numArr = [1, 1, 2, 3, 5, 6, 7, 1, 4, 5, 8, 2, 8]

let conutNum = numArr.reduce((allNum, num) => {
  if(num in allNum) {
    allNum[num]++
  } else {
    allNum[num] = 1
  }
  return allNum
}, {})

console.log('conutNum', conutNum) // conutNum { '1': 3, '2': 2, '3': 1, '4': 1, '5': 2, '6': 1, '7': 1, '8': 2 }