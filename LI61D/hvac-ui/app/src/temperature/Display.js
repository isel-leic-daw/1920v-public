import React from 'react'

/**
 * Used to display a temperature value, along with its label
 */
function Display({ value, label }) {
  const displayValue = value || "--"
  return (
    <div className="ui huge statistic">
      <div className="value"> {displayValue}&deg;</div>
      <div className="label"> {label} </div>
    </div>  
  )
}

export default Display