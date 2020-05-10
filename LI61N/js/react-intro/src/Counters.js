import React from 'react'
import Counter from './CounterUsingHooks0'

export default class Counters extends React.Component {
  constructor (props) {
    super(props)
    this.state = { counters: [] }
  }

  render () {
    return (
      <>
        {Array.from(Array(10).keys()).map(ix => <Counter key={ix} callback={(value) => this.update(ix, value)} />)}
        <div>
          {Counters.sum(this.state.counters)}
        </div>
      </>
    )
  }

  static sum (counters) {
    return counters.reduce((acc, item) => {
      if (item) {
        return item + acc
      }
      return acc
    }, 0)
  }

  update (ix, value) {
    this.setState(({ counters }) => {
      const v = [...counters]
      v[ix] = value
      return {
        counters: v
      }
    })
  }
}
