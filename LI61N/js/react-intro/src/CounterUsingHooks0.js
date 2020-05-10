import React, { useState, useEffect } from 'react'

export default function CounterUsingHooks ({ callback }) {
  const [counter, setCounter] = useState(10)

  useEffect(() => {
    console.log('on effect #1')
    callback(counter)
  }, [counter])

  useEffect(() => {
    console.log('on effect #2')
    const intervalId = setInterval(() => setCounter(oldCounter => oldCounter + 1), 2000)
    return () => { clearInterval(intervalId) }
  }, [])

  return (
    <div>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      {counter}
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  )
}

/* useState
 first call:
  - create slot on index 0, with value 10, returns array with value (10) and the setter function

 second call:
  - already exists a slot at index 0, returns array with the stored value and the setter function
*/

/* useEffect

 first call:
 - render starts
  - useEffect(() => callback(10), [10])
 - render ends
 - element tree is committed
 - effect is called, i.e.,  () => callback(10)

 second call:
 - render starts
  - useEffect(() => callback(10), [10]) -- useEffect is ignored
.- render ends
 - element tree is committed
 - effect is NOT called

 thirs call:
 - render starts
  - useEffect(() => callback(11), [11]) -- useEffect is NOT ignored
 - render ends
 - element tree is committed
 - effect IS called
 */
