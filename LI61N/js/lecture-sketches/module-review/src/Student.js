import React from 'react'

// Component
export default function Student ({ name, number }) {
  return React.createElement('div', null,
    React.createElement('p', null, name),
    React.createElement('p', null, number)
  )
}
