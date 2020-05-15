import React, { useState, useEffect, useCallback } from 'react'

export default function Input ({ onChange }) {
  const [editUrl, setEditUrl] = useState('')
  const [validationState, setValidationState] = useState()

  useEffect(() => {
    function validate () {
      try {
        new URL(editUrl)
        setValidationState('OK')
      } catch (e) {
        setValidationState(`Error: ${e.message}`)
      }
    }
    setValidationState('')
    if (!editUrl || editUrl === '') {
      return
    }
    const timerId = setTimeout(validate, 2000)
    return () => {
      clearTimeout(timerId)
    }
  }, [editUrl, setValidationState])

  const handleOnSubmit = useCallback((e) => {
    if (onChange) {
      onChange(editUrl)
    }
    e.preventDefault()
  }, [onChange, editUrl])

  const handleOnChange = useCallback((e) => {
    setEditUrl(e.target.value)
  }, [setEditUrl])

  return (
    <form onSubmit={handleOnSubmit}>
      <input type='text' value={editUrl} onChange={handleOnChange} />
      {validationState}
    </form>
  )
}
