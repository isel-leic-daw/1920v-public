import React, { useState, useEffect } from 'react'
import TemperatureCard from './TemperatureCard'

/**
 * Component used to display the fragment with the HVAC's temperature control
 * 
 * @param {*} props - The props object with the following properties:
 *    temperatureService  - the service used to interact with the API's temperature resource
 */
function TemperatureFragment({ temperatureService }) {

  const initialTemperatureState =  { 
    current: { value: "", label: "Current" },
    target: { value: "", label: "Target" }
  }

  const [temperatureState, setTemperatureState] = useState(initialTemperatureState)

  async function fetchTemperatureInfo() {
    return temperatureService.getTemperatureInfo().then((temperature) => {
      if (temperature) { setTemperatureState(temperature) }
    })
  }

  // The following hook executes after EVERY render...
  useEffect(() => {
    if (!temperatureState.current.value) fetchTemperatureInfo()
  })

  // The following hook executes after EVERY render...
  useEffect(() => {
    const timerId = setTimeout(() => { fetchTemperatureInfo() }, 10000)
    return () => { clearTimeout(timerId) }
  })

  const [updating, setUpdating] = useState(false)

  async function handleTargetTemperatureChanged(oldValue, newValue) {
    setUpdating(true)
    console.log(`Old value = ${oldValue}; New value = ${newValue}`)
    temperatureService.updateTargetTemperature(newValue).then((updatedTemperature) => {
      if (updatedTemperature) {
        console.log(`Result is ${JSON.stringify(updatedTemperature)}`)
        setTemperatureState(updatedTemperature)
        setUpdating(false)
      }
    })
  }
  
  return (
    <div className="ui text container">
      <div className="ui centered cards">
        <TemperatureCard value={temperatureState.current.value} 
            label={temperatureState.current.label} />

        <TemperatureCard value={temperatureState.target.value} 
            label={temperatureState.target.label} 
            editable={true} disabled={temperatureState.target.value === "" || updating} 
            onChange={handleTargetTemperatureChanged} />
      </div>
    </div>
  )
}

export default TemperatureFragment
