import React, { useState } from 'react'

/**
 * Component that represents the application's login page
 * 
 * @prop {object} service       - a prop bearing the Login service to be used (an injected dependency)
 * @prop {function} onLogin     - a prop bearing the function to be called after the user entered his credentials
 * @prop {string} errorMessage  - optional prop containing the error message to be displayed when the component is rendered
 */
function LoginPage({ service, errorMessage, onLogin }) {
  
  const [ credentials, setCredentials ] = useState({ username: "", password: "" })
  
  function handleInputChange(event) {
    const newCredentials = { ...credentials }
    newCredentials[event.target.name] = event.target.value
    setCredentials(newCredentials)
  }

  function isInputValid() {
    function isNullOrBlank(str) {
      return !str || str.trim().length === 0
    }
    return !isNullOrBlank(credentials.username) && !isNullOrBlank(credentials.password)
  }

  const initialErrorState = errorMessage ? 
          { errorMsgDisplay: { display: 'block' }, errorMessage: errorMessage } : 
          { errorMsgDisplay: { display: 'none' }, errorMessage: 'Please enter a username and a password' }
  const [ error, setErrorMessage ] = useState(initialErrorState)
  
  async function handleSubmit(event) {
    event.preventDefault()
    if (isInputValid()) {
      await service.login(credentials.username, credentials.password)
      onLogin()
    }
    else {
      setErrorMessage({ errorMsgDisplay: { display: 'block' }, errorMessage: error.errorMessage })
      return Promise.resolve()
    }
  }
    
  return (
    <div className='ui middle aligned center aligned grid' style={{ marginTop: 125 }}>
      <div className='column' style={{maxWidth: 380}}>
        <h2 className='ui header centered'>
          <div className='content'>HVAC UI</div>
        </h2>
        <form className='ui large form' onSubmit={handleSubmit}>
          <div className='ui segment'>
            <div className='field'>
              <div className='ui left icon required input'>
                <i className='user icon'></i>
                <input type='text' name='username' placeholder='Your username' onChange={handleInputChange} />
              </div>
            </div>
            <div className='field'>
              <div className='ui left icon required input'>
                <i className='key icon'></i>
                <input type='password' name='password' placeholder='Your password' onChange={handleInputChange} />
              </div>
            </div>
            <button className='ui fluid large submit button' type='submit'>
              <i className='sign in icon'></i>Sign in
            </button>
          </div>
          <div className='ui error message' style={error.errorMsgDisplay}>{error.errorMessage}</div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage