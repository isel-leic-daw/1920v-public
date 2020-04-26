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

test('first', async () => {
  const p = await delay(10, 1000)
  expect(p).toBe(10)

  const p2 = delay(10, 1000)
  expect(p2.then).toBeDefined()

  const p3 = await p2

  expect(p3).toBe(10)
})

async function sequential (x) {
  const a = await delay(x, 500)
  const b = await delay(x, 500)
  return a + b
}

async function parallel (x) {
  const a = delay(x, 750)
  const b = delay(x, 750)
  return await a + await b
}

test('let us do a race', async () => {
  const res = await Promise.race([
    sequential(10),
    parallel(100)
  ])

  expect(res).toBe(200)
})

test('async function returns on first await', async () => {
  const logs = []

  async function f () {
    logs.push('inside f, before await') // (2)
    await delay(1, 1000) // f returns a promise
    logs.push('inside f, after await') // (4)
  }

  logs.push('before call to f') // (1)
  const p = f()
  logs.push('after call to f') // (3)
  await p
  logs.push('after await p') // (5)

  expect(logs).toEqual([
    'before call to f',
    'inside f, before await',
    'after call to f',
    'inside f, after await',
    'after await p'
  ])
})

test('promise then is async', async () => {
  const logs = []

  const p = Promise.resolve(10)
  logs.push('before then')
  const p2 = p.then(v => {
    logs.push('inside function provided to then')
  })
  logs.push('after then')
  await p2
  logs.push('after await')
  expect(logs).toEqual([
    'before then',
    'after then',
    'inside function provided to then',
    'after await'
  ])
})
