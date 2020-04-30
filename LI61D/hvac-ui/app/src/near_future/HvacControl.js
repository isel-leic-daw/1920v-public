import React from 'react'
import { Radio } from 'semantic-ui-react'

/**
 * Component used to edit a temperature value.
 * 
 * @param {*} props - The props object with the following properties:
 * ...
 */
class HvacControl extends React.Component {

  render() {
    return (
      <div className="ui massive floating message">
        <p>HVAC is </p> 
        <Radio toggle label={"OFF"}> </Radio> 
      </div>
    )
  }
}

export default HvacControl