import React from 'react'

// Component
export default function Student ({ name, number }) {
  return (
    <div>
      <h3>Student:</h3>
      <p>Name: {name}</p>
      <p>Number: {number}</p>
    </div>
  )
}
