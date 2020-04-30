function temperatureInfoFromSiren(sirenContent) {
  return {
    current: { value: sirenContent.properties.current, label: 'Current' },
    target: { value: sirenContent.properties.target, label: 'Target' }
  }
}

/**
 * Function used to obtain a mocked version of the service associated to the temperature resource
 */
export function getTemperatureService() {
  return {
    getTemperatureInfo: async () => {
      console.log(`TemperatureService.getTemperatureInfo()`)
      const response = await fetch('http://localhost:8080/temperature')
      const content = await response.json()
      return temperatureInfoFromSiren(content)
  },

    updateTargetTemperature: async (newValue) => {
      console.log(`TemperatureService.updateTarget(${newValue})`)
      // The error that was being shown during the final phase of the stream was simply that
      // a TODO: was here instead of the actual implementation :P (LOL, what a noob)
      const response = await fetch('http://localhost:8080/temperature/target', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: newValue })
      })
      const content = await response.json()
      return temperatureInfoFromSiren(content)
    }
  }
}

/**
 * Function used to obtain a mocked version of the service associated to the temperature resource
 */
export function getMockedTemperatureService() {
  const temperatureInfo = { 
    current: { value: 25, label: "Current" },
    target: { value: 25, label: "Target" }
  }
  
  return {
    getTemperatureInfo: async () => {
      console.log(`MockedTemperatureService.getTemperatureInfo()`)
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(temperatureInfo), 5000)
      })    
    },

    updateTargetTemperature: async (newValue) => {
      console.log(`MockedTemperatureService.updateTarget(${newValue})`)
      return new Promise((resolve, reject) => {
        setTimeout(() => { temperatureInfo.target.value = newValue; resolve(temperatureInfo) }, 5000)
      })    
    }
  }
}
