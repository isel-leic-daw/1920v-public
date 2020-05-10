import React, { useState, useEffect } from 'react'

const defaultPeriod = 1000

function PeriodInput ({ onChange }) {
  const [newPeriod, setNewPeriod] = useState(defaultPeriod)

  function handleOnSubmit (event) {
    event.preventDefault()
    const value = parseInt(newPeriod)
    if (!isNaN(value) && onChange) {
      onChange(value)
    } else {
      setNewPeriod(defaultPeriod)
    }
  }

  function handleOnChange (event) {
    setNewPeriod(event.target.value)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor='period'>New period = </label>
      <input type='number' id='period' onChange={handleOnChange} value={newPeriod} />
    </form>
  )
}

export default function TimedCounter () {
  const [period, setPeriod] = useState(defaultPeriod)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.log(`Setting timer with ${period}`)
    const timerId = setInterval(() => setCounter(old => old + 1), period)
    return () => {
      console.log(`Cancelling timer with ${period}`)
      clearInterval(timerId)
    }
  }, [period])

  function handleOnChange (newValue) {
    setPeriod(newValue)
  }

  console.log('Render TimedCounter')
  return (
    <>
      <PeriodInput onChange={handleOnChange} />
      <p>Period = {period}</p>
      <p>Counter = {counter}</p>
    </>
  )
}
