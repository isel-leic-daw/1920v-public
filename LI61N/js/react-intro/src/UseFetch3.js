import { useState, useEffect } from 'react'

export const FetchStates = {
  init: 'init',
  fetching: 'fetching',
  error: 'error',
  done: 'done'
}

export default function useFetch (url) {
  const [fetchState, setFetchState] = useState()
  const [response, setResponse] = useState()
  const [json, setJson] = useState()

  useEffect(() => {
    let isCancelled = false
    async function get () {
      if (!url || url === '') {
        setFetchState(FetchStates.init)
        return
      }
      try {
        setFetchState(FetchStates.fetching)
        const resp = await fetch(url)
        const contentType = resp.headers.get('Content-Type')
        if (!contentType || !contentType.startsWith('application/json')) {
          if (!isCancelled) {
            setResponse(resp)
            setJson(null)
            setFetchState(FetchStates.done)
          }
          return
        }
        const json = await resp.json()
        if (!isCancelled) {
          setResponse(resp)
          setJson(json)
          setFetchState(FetchStates.done)
        }
      } catch (e) {
        if (!isCancelled) {
          setFetchState(FetchStates.error)
        }
      }
    }
    get()
    return () => {
      isCancelled = true
    }
  }, [url, setFetchState, setResponse, setJson])

  return [fetchState, response, json]
}
