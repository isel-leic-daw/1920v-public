import { useState, useEffect } from 'react'

export const FetchStates = {
  clear: 'clear',
  fetching: 'fetching',
  done: 'done',
  error: 'error'
}

export default function useFetch (url) {
  const [fetchState, setFetchState] = useState(FetchStates.clear)
  const [response, setResponse] = useState()
  const [json, setJson] = useState()

  useEffect(() => {
    const abortController = new AbortController()
    let cancel = false
    async function get () {
      try {
        if (url === '') {
          setFetchState(FetchStates.clear)
          return
        }
        setFetchState(FetchStates.fetching)
        const res = await fetch(url, { signal: abortController.signal })
        setResponse(res)
        if (!res.headers.get('content-type').startsWith('application/json')) {
          setJson(undefined)
          setFetchState(FetchStates.done)
          return
        }
        const json = await res.json()
        if (!cancel) {
          console.log(`fetch for ${url} completed`)
          setFetchState(FetchStates.done)
          setJson(json)
        } else {
          console.log(`fetch for ${url} was cancelled`)
        }
      } catch (e) {
        if (!cancel) {
          setFetchState(FetchStates.error)
        }
      }
    }
    get()
    return () => {
      cancel = true
      abortController.abort()
    }
  }, [url, setFetchState, setResponse, setJson])

  return [fetchState, response, json]
}
