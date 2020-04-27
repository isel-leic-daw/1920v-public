import React from 'react'
import Display from './Display'
import Control from './Control'

/**
 * A Component used to display and eventually edit a temperature.
 * 
 * @param {*} props - The props object with the following properties:
 *  editable  - a boolean vaule indicating whether the temperature is editable our not (default value is false)
 *  disabled  - a boolean value indicating whether the component is disabled or not. Default is false.
 *  value     - the temperature value to be displayed
 *  label     - the text label to be displayed along with the temperature value  
 */
function Card(props) {
  return (
    <div className="ui raised centered card">
      <div className="content">
        <Display { ... props } />
      </div>
      <div className="extra content">
        <Control editable={props.editable} disabled={props.disabled} />
      </div>
    </div>
  )
}

export default Card