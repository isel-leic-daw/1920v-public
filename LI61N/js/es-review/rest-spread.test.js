test('rest in function parameters', () => {
  function f (a, b, ...c) {
    return [a, b, c]
  }

  expect(f(1, 2, 3, 4)).toEqual([1, 2, [3, 4]])
})

test('rest in lambda parameters', () => {
  const f = (a, b, ...c) => {
    return [a, b, c]
  }

  expect(f(1, 2, 3, 4, 5)).toEqual([1, 2, [3, 4, 5]])
})

test('rest in array destructuring', () => {
  const a0 = [0, 1, 2, 3, 4]

  const [v0, v1, v2, ...v3] = a0

  expect(v0).toBe(0)
  expect(v1).toBe(1)
  expect(v2).toBe(2)
  expect(v3).toEqual([3, 4])
})

test('rest in object destructuring', () => {
  const student = {
    name: 'Alice',
    number: 12345,
    program: 'LEIC'
  }

  const { name, number, ...otherFieds } = student

  expect(name).toBe('Alice')
  expect(number).toBe(12345)
  expect(otherFieds).toEqual({ program: 'LEIC' })
})

test('spread in parameters', () => {
  function f (a, b, c, d, e) {
    return [a, b, c, d, e]
  }

  const arr = [1, 2, 3, 4, 5]

  expect(f(arr)).toEqual([[1, 2, 3, 4, 5], undefined, undefined, undefined, undefined])

  expect(f(...arr)).toEqual([1, 2, 3, 4, 5])
})

test('spread and rest in parameters', () => {
  function f (a, b, ...c) {
    return [a, b, c]
  }

  const arr = [1, 2, 3, 4, 5]
  expect(f(...arr)).toEqual([1, 2, [3, 4, 5]])
})

test('spread in array construction', () => {
  const a0 = [3, 4, 5]
  const a1 = [1, 2, a0]
  const a2 = [1, 2, ...a0]

  expect(a1).toEqual([1, 2, [3, 4, 5]])

  expect(a2).toEqual([1, 2, 3, 4, 5])
})

test('spread in object construction', () => {
  const address = { street: 'wonder', city: 'land' }
  const alice = { name: 'Alice', number: '12345' }
  const obj0 = { alice, address }
  const obj1 = { ...alice, ...address }

  expect(obj0).toEqual({
    alice: { name: 'Alice', number: '12345' },
    address: { street: 'wonder', city: 'land' }
  })

  expect(obj1).toEqual({
    name: 'Alice', number: '12345', street: 'wonder', city: 'land'
  })
})
