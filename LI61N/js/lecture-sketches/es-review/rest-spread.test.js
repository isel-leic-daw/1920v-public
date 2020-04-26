test('rest in parameters', () => {
  function f (a, b, c) {
    return [a, b, c]
  }

  function g (a, b, ...c) {
    return [a, b, c]
  }

  expect(f(1, 2, 3, 4, 5)).toEqual([1, 2, 3])
  expect(g(1, 2, 3, 4, 5)).toEqual([1, 2, [3, 4, 5]])
})

test('spread in call', () => {
  function f (a, b, c) {
    return [a, b, c]
  }

  const a = [1, 2, 3]
  const res = f(a)
  expect(res).toEqual([[1, 2, 3], undefined, undefined])

  const res2 = f(...a)
  expect(res2).toEqual([1, 2, 3])
})

test('rest in object deconstruction', () => {
  const alice = {
    name: 'Alice',
    number: 12345,
    program: 'LEIC',
    email: 'alice@example.com'
  }

  const { name, number, ...otherFields } = alice

  expect(name).toBe('Alice')
  expect(number).toBe(12345)
  expect(otherFields).toEqual({
    program: 'LEIC',
    email: 'alice@example.com'
  })
})

test('spread in object construction', () => {
  const alice = {
    name: 'Alice',
    number: 12345
  }

  const address = {
    street: 'Wonder',
    city: 'Land'
  }

  const bob = {
    name: 'Bob',
    number: 12346
  }

  const student0 = { alice, address }
  const student1 = { ...alice, ...address }
  const student2 = { ...alice, ...bob }

  expect(student0).toEqual({
    alice: {
      name: 'Alice',
      number: 12345
    },
    address: {
      street: 'Wonder',
      city: 'Land'
    }
  })

  expect(student1).toEqual({
    name: 'Alice',
    number: 12345,
    street: 'Wonder',
    city: 'Land'
  })

  expect(student2).toEqual({
    name: 'Bob',
    number: 12346
  })
})

test('spread and rest with arrays', () => {
  const [a, b, ...c] = [1, 2, 3, 4, 5]

  expect(a).toBe(1)
  expect(b).toBe(2)
  expect(c).toEqual([3, 4, 5])

  const arr = [10, 20, 30]
  const a1 = [1, 2, arr]
  const a2 = [1, 2, ...arr]

  expect(a1).toEqual([1, 2, [10, 20, 30]])
  expect(a2).toEqual([1, 2, 10, 20, 30])
})
