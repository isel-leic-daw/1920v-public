import React from 'react'
import Display from './TemperatureDisplay'
import Control from './TemperatureControl'

/**
 * A Component used to display and eventually edit a temperature.
 * 
 * @param {*} props - The props object with the following properties:
 *  editable  - a boolean vaule indicating whether the temperature is editable our not (default value is false)
 *  disabled  - a boolean value indicating whether the component is disabled or not. Default is false.
 *  value     - the temperature value to be displayed
 *  label     - the text label to be displayed along with the temperature value  
 *  onChange  - the callback function to be used whenever the temperature is changed by the user. The 
 *              function receives the temperature values initialValue and newValue.
 */
function TemperatureCard(props) {
  return (
    <div className="ui raised centered card">
      <div className="content">
        <Display { ... props } />
      </div>
      <div className="extra content">
        <Control editable={props.editable} disabled={props.disabled} initialValue={props.value} onChange={props.onChange} />
      </div>
    </div>
  )
}

export default TemperatureCard