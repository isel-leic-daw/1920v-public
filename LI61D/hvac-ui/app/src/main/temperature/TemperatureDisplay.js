import React from 'react'

/**
 * Used to display a temperature value, along with its label
 */
function TemperatureDisplay({ value, label }) {
  return (
    <div className="ui huge statistic">
      <div className="value"> {value === 0 ? value : value || '--'}&deg;</div>
      <div className="label"> {label} </div>
    </div>  
  )
}

export default TemperatureDisplay