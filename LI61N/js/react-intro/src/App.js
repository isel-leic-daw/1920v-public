import React from 'react'
// import StudentList from './StudentList'
import Counter from './Counter2'

const students = [
  { name: 'Alice', number: 12345 },
  { name: 'Bob', number: 12346 },
  { name: 'Carol', number: 12347 },
  { name: 'David', number: 12348 },
  { name: 'Eleanor', number: 12349 }
]

export default function App ({ len }) {
  return (
    <div>
      {Array.from(Array(len).keys()).map(ix => <Counter key={ix} />)}
    </div>
  )
}
