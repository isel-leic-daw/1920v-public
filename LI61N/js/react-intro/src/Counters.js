import React from 'react'
import Counter from './Counter'

export default class Counters extends React.Component {
  constructor (props) {
    super(props)
    this.state = { counters: [] }
  }

  render () {
    return (
      <>
        {Array.from(Array(10).keys()).map(ix => <Counter key={ix} notify={(value) => this.update(ix, value)} />)}
        <div>
          {this.state.counters.reduce((old, item) => old + item, 0)}
        </div>
      </>
    )
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
