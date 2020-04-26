
function delay (value, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), ms)
  })
}

function delayError (error, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(error), ms)
  })
}

test('simple chain', done => {
  const p = delay(42, 1000)
    .then(v => v + 1) // map: number->number
    .then(v => delay(v + 1, 100)) // flatMap: number->Promise<Number>

  p.then(v => {
    expect(v).toBe(44)
    done()
  })

  // Notice:
  // - the `done` used to mark the test as completed, since it is asynchronous
  // - `delay` and each `then` return a new promise ()
  // - `then` acts both as a `map` and a `flatMap`
})

test('race with success', done => {
  const p1 = delay(1, 500)
  const p2 = delay(2, 250)
  const p3 = Promise.race([p1, p2])

  p3.then(v => {
    expect(v).toBe(2)
    done()
  })
})

test('race with error', done => {
  const p1 = delay(1, 500)
  const p2 = delayError(new Error('fail!'), 250)
  const p3 = Promise.race([p1, p2])

  p3.catch(e => {
    expect(e.message).toBe('fail!')
    done()
  })
})

test('Promise.all', done => {
  const p1 = delay(1, 500)
  const p2 = delay(2, 250)
  const p3 = Promise.all([p1, p2])

  p3.then(v => {
    expect(v).toEqual([1, 2])
    done()
  })
})

test('Promise.all with errors', done => {
  const p1 = delay(1, 500)
  const p2 = delayError(new Error('fail!'), 250)
  const p3 = Promise.all([p1, p2])

  p3.catch(e => {
    expect(e.message).toBe('fail!')
    done()
  })
})
