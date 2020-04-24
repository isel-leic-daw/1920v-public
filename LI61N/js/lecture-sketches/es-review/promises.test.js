
function delay (value, timeInMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), timeInMs)
  })
}

test('', done => {
  delay(10, 1000) // delay returns a Promise
    .then(v => { // .then returns a Promise
      expect(v).toBe(10)
      done()
    })
})
