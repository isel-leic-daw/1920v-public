import React from 'react'
// import StudentList from './StudentList'
import Counter from './Counter3'
// import TimedCounter from './TimedCounter'
import Counters from './Counters'
// import FormExample from './FormExample'
import CounterUsingHooks0 from './CounterUsingHooks0'
import RouterExample from './RouterExample'
import FetchExample from './FetchExample'
import HooksExample from './HooksExample'

const students = [
  { name: 'Alice', number: 12345 },
  { name: 'Bob', number: 12346 },
  { name: 'Carol', number: 12347 },
  { name: 'David', number: 12348 },
  { name: 'Eleanor', number: 12349 }
]

function range (len) { return [...Array(len).keys()] }

export function App2 ({ len }) {
  return (
    <div>
      {range(10).map(ix => <Counter key={ix} />)}
    </div>
  )
}

export default function App ({ len }) {
  return (
    <HooksExample />
  )
}
