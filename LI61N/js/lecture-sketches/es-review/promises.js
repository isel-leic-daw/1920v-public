
function delay (value, timeInMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), timeInMs)
  })
}

function delayError (cause, timeInMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(cause)), timeInMs)
  })
}

test('first', done => {
  delay(10, 1000) // delay returns immediatly, returning a Promise
    .then(v => { // .then returns a Promise
      expect(v).toBe(10)
      done()
    })
})

test('second', done => {
  const p = delay(10, 1000) // p0
    .then(v => v + 1) // p1
    .then(v => { throw new Error('fail') }) // p2
    .then(v => v + 1) // p3
    .catch(e => e.message)

  p.then(v => {
    expect(v).toBe('fail')
    done()
  })
})

test('third', done => {
  const p = delay(10, 1000) // p0
    .then(v => v + 1, e => 'fail1') // p1
    .then(v => { throw new Error('fail2') }) // p2
    .then(v => v + 1, e => 'handled') // p3

  p.then(v => {
    expect(v).toBe('handled')
    done()
  })
})

test('then is simultaneously map and flatMap', done => {
  const p = delay(10, 1000)
    .then(v => v * 10) // number -> number - map
    .then(v => delay(v, v)) // number -> Promise<number> - flatMap

  // Q: p is a Promise<number> or Promise<Promise<number>>?
  // A: p is a Promise<number>

  p.then(v => {
    expect(v).toBe(100)
    done()
  })
})

test('Promise.race', done => {
  const p1 = delay('a', 500)
  const p2 = delay('b', 250)
  const prace = Promise.race([p1, p2])

  prace.then(v => {
    expect(v).toBe('b')
    done()
  })
})

test('Promise.all', done => {
  const p1 = delay('a', 500)
  const p2 = delay('b', 250)
  const pall = Promise.all([p1, p2])

  pall.then(v => {
    expect(v).toEqual(['a', 'b'])
    done()
  })
})

test('Promise.all with rejection', done => {
  const p1 = delay('a', 500)
  const p2 = delayError('b', 250)
  const pall = Promise.all([p1, p2])

  pall.catch(e => {
    expect(e.message).toEqual('b')
    done()
  })
})
