import React from 'react'

/**
 * The context default value. 
 * 
 * I'm using mnostly for documentating the contract between the context provider (i.e. HvacPage) 
 * and its consumers.
 * 
 * @property{string}  errorMessage - The error message if the current state is the error state,
 *                                   or undefined if all is well
 */
const contextDefaultValue = {
  errorMessage: undefined
}

const HvacContext = React.createContext(contextDefaultValue)

export default HvacContext
