import { useEffect, useReducer } from 'react'

export const FetchStates = {
  clear: 'clear',
  fetching: 'fetching',
  done: 'done',
  error: 'error'
}

const ActionsTypes = {
  clear: 'clear',
  start: 'start',
  error: 'error',
  response: 'response',
  json: 'json'
}

function reducer (state, action) {
  switch (action.type) {
    case ActionsTypes.clear:
      return { fetchState: FetchStates.clear }
    case ActionsTypes.start:
      return { fetchState: FetchStates.fetching }
    case ActionsTypes.error:
      return { fetchState: FetchStates.error }
    case ActionsTypes.response:
      return { fetchState: FetchStates.done, response: action.response }
    case ActionsTypes.json:
      return { fetchState: FetchStates.done, response: state.response, json: action.json }
  }
}

export default function useFetch (url) {
  const [{ fetchState, response, json }, disp] = useReducer(reducer, { fetchState: FetchStates.clear })

  useEffect(() => {
    const abortController = new AbortController()
    let cancel = false
    const dispatch = (action) => {
      if (!cancel) {
        disp(action)
      }
    }
    async function get () {
      try {
        if (url === '') {
          dispatch({ type: ActionsTypes.clear })
          return
        }
        dispatch({ type: ActionsTypes.start })
        const res = await fetch(url, { signal: abortController.signal })
        dispatch({ type: ActionsTypes.response, response: res })
        if (!res.headers.get('content-type').startsWith('application/json')) {
          return
        }
        const json = await res.json()
        dispatch({ type: ActionsTypes.json, json: json })
      } catch (e) {
        dispatch({ type: ActionsTypes.error })
      }
    }
    get()
    return () => {
      cancel = true
      abortController.abort()
    }
  }, [url, disp])

  return [fetchState, response, json]
}
