
const POWER_STATE_UPDATE_ACTION_NAME = 'set-power-state'

/**
 * Checks if the given argument is a PowerState instance.
 * @param {object} sirenContent - the siren object to checked.
 * @returns a boolean valiue indicating whether {sirenContent} is a PowerState instance or not.
 */
function isPowerState(sirenContent) {
  return Boolean(sirenContent.class.find(elem => elem === "PowerState"))
}

/**
 * Gets the power state value from the given siren content.
 * @param {object} sirenContent - the sirenm content from where the power state is to be extracted.
 */
function powerStateFromSiren(sirenContent) {
  return isPowerState(sirenContent) ? { value: sirenContent.properties.value } : undefined
}

/**
 * Gets the action that describes the operation for updating the HVAC's power state resource.
 * @param {object} sirenContent - - the sirenm content from where the action is to be extracted.
 * @returns the update action or undefined if it could not be found in the received object.
 */
function powerStateUpdateActionFromSiren(sirenContent) {
  return isPowerState(sirenContent) ? 
    sirenContent.actions.find((elem) => elem.name === POWER_STATE_UPDATE_ACTION_NAME) :
    undefined
}

/**
 * Gets the information required to initialize the HTTP request to be used to update the HVAC's 
 * power state resource.
 * @param {string} newValue - The new power state
 * @param {object} action - The action describing the operation (i.e. a Siren Action) 
 */
function initRequestFromAction(newValue, action) {
  // TODO: This should be a bit more generic, but you get where this is going. ;)
  return  {
    method: action.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: newValue })
  }
}

/**
 * Function used to obtain the service associated to the HVAC's power-state resource
 * @param {URL} resourceUrl - The absolute URL of the HVAC's power-state resource
 */
export function getHvacService(resourceUrl) {
  return {
    getPowerState: async () => {
      console.log(`HvacService.getPowerState()`)
      const response = await fetch(resourceUrl)
      return await response.json()
    },

    updatePowerState: async (newValue, action) => {
      if (action.name !== POWER_STATE_UPDATE_ACTION_NAME) {
        throw new Error(`Unknown update power state action ${action.name}`)
      }

      const baseUrl = resourceUrl
      console.log(`HvacService.updatePowerState(${newValue})`)
      const response = await fetch(new URL(action.href, baseUrl), initRequestFromAction(newValue, action))
      return await response.json()
    },

    getPowerStateUpdateAction: (sirenContent) => powerStateUpdateActionFromSiren(sirenContent),
    convertToPowerState: (sirenContent) => powerStateFromSiren(sirenContent)
  }
}

/**
 * Function used to obtain a mocked version of the service associated to the HVAC resource
 */
export function getMockedHvacService() {
  const hvacPowerStateResource = {
    "class": [ "PowerState" ],
    "properties": { "value": "OFF" },
    "links": [ { "rel": [ "self"], "href": "/hvac/power-state" } ],
    "actions": [
      {
        "name": "set-power-state",
        "href": "/hvac/power-state",
        "title": "Set Power State",
        "method": "PUT",
        "type": "application/json",
        "fields": [ { "name": "value", "type": "number" } ]
      }
    ]
  }

  return {
    getPowerState: async () => {
      console.log(`MockedHvacService.getPowerState()`)
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(hvacPowerStateResource), 5000)
      })    
    },

    updatePowerState: async (newValue) => {
      console.log(`MockedHvacService.updatePowerState(${newValue})`)
      return new Promise((resolve, reject) => {
        setTimeout(() => { 
          hvacPowerStateResource.properties.value = newValue; resolve(hvacPowerStateResource) }, 5000)
      })    
    },

    getPowerStateUpdateAction: (sirenContent) => powerStateUpdateActionFromSiren(sirenContent),
    convertToPowerState: (sirenContent) => powerStateFromSiren(sirenContent)
  }
}
