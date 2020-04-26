test('basic destructuring', () => {
  function getStudent () {
    return { name: 'Alice', number: 12345 }
  }

  const { name, number } = getStudent()

  expect(name).toBe('Alice')
  expect(number).toBe(12345)

  const obj = getStudent()
  const name1 = obj.name
  const number1 = obj.number

  expect(name1).toBe('Alice')
  expect(number1).toBe(12345)
})

test('basic destructuring with renaming', () => {
  function getStudent () {
    return { name: 'Alice', number: 12345 }
  }

  const { name: newName, number: newNumber } = getStudent()

  expect(newName).toBe('Alice')
  expect(newNumber).toBe(12345)
})

test('parameter destructuring', () => {
  function getStudent () {
    return { name: 'Alice', number: 12345 }
  }

  function toString ({ name, number }) {
    return `name: ${name}, number: ${number}`
  }

  expect(toString(getStudent())).toBe('name: Alice, number: 12345')
})

test('parameter destructuring', () => {
  function something ({ name, number }, { name: name2, number: number2 }) {
    return `names: ${name}, ${name2}, numbers: ${number}, ${number2}`
  }

  expect(something(
    { name: 'Alice', number: 12345 },
    { name: 'Bob', number: 12346 }
  )).toBe('names: Alice, Bob, numbers: 12345, 12346')
})
