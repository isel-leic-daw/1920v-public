import React, { useState } from 'React'

export default function () {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <button onClick={setCounter(old => old - 1)}>-</button>
      {counter}
      <button onClick={setCounter(old => old + 1)}>+</button>
    </div>
  )
}
