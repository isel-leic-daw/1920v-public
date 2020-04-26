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

async function f1 (x) {
  const v1 = await delay(x, 100)
  const v2 = await delay(v1 + 1, 100)
  return v2
}

test('async 0', () => {
  const res = f1(1)
  expect(res.then).toBeDefined()
})

test('async 0', async () => {
  const res = await f1(1)
  expect(res).toBe(2)
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

test('sequential vs. parallel', async () => {
  const res = await Promise.race([sequential(10), parallel(100)])
  expect(res).toBe(200)
})

test('async function completes immediatly', async () => {
  const logs = []
  async function f () {
    logs.push('inside f, before await')
    await delay(0, 250)
    logs.push('inside f, after await')
  }

  logs.push('before call to f')
  const p = f()
  logs.push('after call to f')
  await p
  logs.push('after await')

  expect(logs).toEqual([
    'before call to f',
    'inside f, before await',
    'after call to f',
    'inside f, after await',
    'after await'
  ])
})

test('unhandled error', async () => {
  delayError(new Error(), 250)
})

test('unhandled error 2 ', async () => {
  try {
    await delayError(new Error('yes!'), 250)
    expect(true).toBe(false)
  } catch (e) {
    expect(e.message).toBe('yes!')
  }
})
