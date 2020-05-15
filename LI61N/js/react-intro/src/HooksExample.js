import React, { useState, useCallback } from 'react'
import useFetch, { FetchStates } from './UseFetch3'
import Input from './Input2'

export default function HooksExample () {
  const [url, setUrl] = useState()
  const [fetchState, response, json] = useFetch(url)

  const handleOnChange = useCallback(value => {
    setUrl(value)
  }, [setUrl])

  return (
    <div>
      <Input onChange={handleOnChange} />
      {url}
      <div>{fetchState}</div>
      {fetchState === FetchStates.done ? response.status : null}
      <pre>
        {fetchState === FetchStates.done && json ? JSON.stringify(json, null, '\t') : null}
      </pre>
    </div>
  )
}
