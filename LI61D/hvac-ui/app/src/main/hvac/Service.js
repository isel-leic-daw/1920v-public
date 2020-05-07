function powerStateFromSiren(sirenContent) {
  return { value: sirenContent.properties.value }
}

/**
 * Function used to obtain a mocked version of the service associated to the HVAC resource
 */
export function getHvacService() {
  return {
    getPowerState: async () => {
      console.log(`HvacService.getPowerState()`)
      const response = await fetch('http://localhost:8080/hvac/power-state')
      const content = await response.json()
      return powerStateFromSiren(content)
    },

    updatePowerState: async (newValue) => {
      console.log(`HvacService.updatePowerState(${newValue})`)
      const response = await fetch('http://localhost:8080/hvac/power-state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: newValue })
      })
      const content = await response.json()
      return powerStateFromSiren(content)
    }
  }
}

/**
 * Function used to obtain a mocked version of the service associated to the HVAC resource
 */
export function getMockedHvacService() {
  const hvacPowerState = { value: 'OFF' }
  
  return {
    getPowerState: async () => {
      console.log(`MockedHvacService.getPowerState()`)
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(hvacPowerState), 5000)
      })    
    },

    updatePowerState: async (newValue) => {
      console.log(`MockedHvacService.updatePowerState(${newValue})`)
      return new Promise((resolve, reject) => {
        setTimeout(() => { hvacPowerState.value = newValue; resolve(hvacPowerState) }, 5000)
      })    
    }
  }
}
