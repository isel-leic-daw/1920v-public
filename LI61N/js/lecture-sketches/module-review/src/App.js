import React from 'react'
import StudentList from './StudentList'

const students = [
  { name: 'Alice', number: 12345 },
  { name: 'Bob', number: 12346 },
  { name: 'Carol', number: 12347 }
]

export default function App () {
  return React.createElement('div', null,
    React.createElement('h1', null, 'Student List'),
    React.createElement(StudentList, { students })
  )
}
