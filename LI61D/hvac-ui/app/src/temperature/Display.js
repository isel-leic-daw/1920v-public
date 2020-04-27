import React from 'react'

/**
 * Used to display a temperature value, along with its label
 */
function Display({ value, label }) {
  return (
    <div className="ui huge statistic">
      <div className="value"> {value}&deg;</div>
      <div className="label"> {label} </div>
    </div>  
  )
}

export default Display