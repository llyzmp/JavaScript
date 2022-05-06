const arr = Array(5).fill('') 
console.log(arr); // [ '', '', '', '', '' ]


const matrix = Array(5).fill(0).map(() => Array(5).fill(0))
console.log(matrix)

/**
 * [
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ]
]
 * 
 * 
 */