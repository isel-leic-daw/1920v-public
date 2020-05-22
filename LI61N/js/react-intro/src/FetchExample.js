import React, { useState, useCallback } from 'react'
import Input from './input'
// import useFetch, { FetchStates } from './UseFetch'
import useFetch, { FetchStates } from './UseFetch2'

export default function FetchExample () {
  const [url, setUrl] = useState('')
  const [fetchState, response, json] = useFetch(url)

  const handleOnUrlChange = useCallback((url) => {
    setUrl(url)
  }, ['setUrl'])

  function fetchResult (fetchState, response, json) {
    if (fetchState === FetchStates.clear) {
      return <p>insert URL</p>
    } else if (fetchState === FetchStates.fetching) {
      return <p>fetching...</p>
    } else if (fetchState === FetchStates.done) {
      return (
        <div>
          <div>Status: {response.status}</div>
          {json ? <pre>{JSON.stringify(json, null, '\t')}</pre> : <div>No application/json content!</div>}
        </div>
      )
    } else {
      return <p>error!</p>
    }
  }

  return (
    <div>
      <Input onChange={handleOnUrlChange} />
      {fetchResult(fetchState, response, json)}
    </div>
  )
}
