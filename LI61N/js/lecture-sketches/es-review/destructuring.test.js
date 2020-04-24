
test('assignment destructuring', () => {
  function getStudent () {
    return { name: 'Alice', number: 12345 }
  }

  const { name, number } = getStudent()

  // const result = getStudent()
  // const name = result.name
  // const number = result.number

  expect(name).toBe('Alice')
  expect(number).toBe(12345)

  const names = ['Alice', 'Bob', 'Carol']

  const [first, second] = names

  expect(first).toBe('Alice')
  expect(second).toBe('Bob')

  const { name: nome, number: numero } = getStudent()

  expect(nome).toBe('Alice')
  expect(numero).toBe(12345)
})

test('parameter destructuring', () => {
  function getStudent () {
    return { name: 'Alice', number: 12345 }
  }

  function studentToString ({ name, number }) {
    return `name = ${name}, number = ${number}`
  }

  const alice = getStudent()
  const s = studentToString(alice)

  expect(s).toBe('name = Alice, number = 12345')

  function doSomething ([first, second]) {
    return `first is ${first}, second is ${second}`
  }

  const res = doSomething([1, 2, 3])
  expect(res).toBe('first is 1, second is 2')
})
