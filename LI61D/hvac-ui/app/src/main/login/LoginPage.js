import React from 'react'

/**
 * Component that represents the application's login page
 * 
 * @prop {object} service       - a prop bearing the Login service to be used (an injected dependency)
 * @prop {function} onLogin     - a prop bearing the function to be called after the user entered his credentials
 * @prop {string} errorMessage  - optional prop containing the error message to be displayed when the compoenent is rendered
 */
class LoginPage extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = this.props.errorMessage ? 
      { errorMsgDisplay: { display: 'block' }, errorMessage: this.props.errorMessage } :
      { errorMsgDisplay: { display: 'none' }, errorMessage: 'Please enter a username and a password' }
  }
    
  validateInput() {
    function isNullOrBlank(str) {
      return !str || str.trim().length === 0
    }
    return !isNullOrBlank(this.state.username) && !isNullOrBlank(this.state.password)
  }

  handleChange = (event) => {
    const addToState = { }
    addToState[event.target.name] = event.target.value
    this.setState(addToState)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    if (this.validateInput()) {
      await this.props.service.login(this.state.username, this.state.password)
      this.props.onLogin()
    }
    else {
      this.setState({ errorMsgDisplay: { display: 'block' } })
      return Promise.resolve()
    }
  }
    
  render() {
    return (
      <div className='ui middle aligned center aligned grid' style={{ marginTop: 125 }}>
        <div className='column' style={{maxWidth: 380}}>
          <h2 className='ui header centered'>
            <div className='content'>HVAC UI</div>
          </h2>
          <form className='ui large form' onSubmit={this.handleSubmit}>
            <div className='ui segment'>
              <div className='field'>
                <div className='ui left icon required input'>
                  <i className='user icon'></i>
                  <input type='text' name='username' placeholder='Your username' onChange={this.handleChange} />
                </div>
              </div>
              <div className='field'>
                <div className='ui left icon required input'>
                  <i className='key icon'></i>
                  <input type='password' name='password' placeholder='Your password' onChange={this.handleChange} />
                </div>
              </div>
              <button className='ui fluid large submit button' type='submit'>
                <i className='sign in icon'></i>Sign in
              </button>
            </div>
            <div className='ui error message' style={this.state.errorMsgDisplay}>{this.state.errorMessage}</div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage