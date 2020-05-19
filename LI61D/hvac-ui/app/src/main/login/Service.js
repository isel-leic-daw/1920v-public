/**
 * Function used to obtain the service associated to the login
 */
export function getLoginService() {

  function getAuthorizationToken(username, password) {
      let credentials = `${username}:${password}`
      return `Basic ${btoa(credentials)}`
  }

  const AUTH_TOKEN_KEY = "AUTH_TOKEN_KEY"

  return {
      /**
       * Method used to perform login with the given credentials. Note that credential verification is not 
       * performed at this time; it is delayed until the first interaction with the API.
       * @param {string} username - the username
       * @param {string} password - the password
       */
      login: (username, password) => {
          sessionStorage.setItem(AUTH_TOKEN_KEY, getAuthorizationToken(username, password))
      },

      /**
       * Checks whether the user is logged in or not
       */
      isLoggedIn: () => { 
          return sessionStorage.getItem(AUTH_TOKEN_KEY) != null
      },

      /**
       * Gets the authorization token if the user is logged in, or null
       */
      getToken: () => {
        return sessionStorage.getItem(AUTH_TOKEN_KEY)
      }
  }
}
