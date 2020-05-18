import React from 'react'

/**
 * Component used to control de HVAC's enabled state.
 * 
 * @param {*} props - The props object with the following properties:
 *  powerState    - a string with the HVAC's power state (i.e. 'ON', 'OFF). Any other value indicates that 
 *                  the HVAC's power state is unknown.
 *  onChange      - the callback function to be used whenever the HVAC's power state is changed 
 *                  by the user. The function receives the new power state. If this prop is undefined
 *                  the button will be disabled.
 */
function HvacControl({powerState, onChange}) {

  function handleButtonClick() {
    onChange(powerState === 'ON' ? 'OFF' : 'ON')
  }

  function renderButton() {
    if (powerState) {
      const buttonColor = powerState === 'ON' ? 'green button' : 'button'
      const iconColor = powerState === 'ON' ? 'green icon' : 'icon'
      return onChange ? 
        <button className={"ui basic " + buttonColor} onClick={handleButtonClick}>
          <i className={"power off " + iconColor} /> {powerState} 
        </button> :
        <button className={"ui basic " + buttonColor} disabled>
          <i className={"power off " + iconColor} /> {powerState}
        </button>
    }
    
    return <button className="ui basic loading button">Loading</button>
  }

  return (
    <div className="ui massive floating message">
      <p>HVAC is </p>
      { renderButton() }
    </div>
  )
}

export default HvacControl