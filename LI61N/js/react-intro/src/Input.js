import React, { useState, useCallback, useEffect } from 'react'

export default function Input ({ onChange }) {
  const [editUrl, setEditUrl] = useState('')
  const [error, setError] = useState('')

  const handleOnChange = useCallback(e => {
    setEditUrl(e.target.value)
  }, [setEditUrl])

  const handleOnSubmit = useCallback(e => {
    if (onChange) {
      onChange(editUrl)
    }
    e.preventDefault()
  }, [onChange, editUrl])

  useEffect(() => {
    console.log('starting timer')
    if (editUrl === '') {
      return
    }
    function validate () {
      console.log('running validate')
      try {
        const url = new URL(editUrl)
        setError('OK')
      } catch (e) {
        setError(e.message)
      }
    }
    const timeoutId = setTimeout(validate, 2000)
    return () => {
      console.log('cancelling timer')
      setError('')
      clearTimeout(timeoutId)
    }
  }, [editUrl, setError])

  return (
    <form onSubmit={handleOnSubmit}>
      <input type='text' value={editUrl} onChange={handleOnChange} />
      {error}
    </form>
  )
}
