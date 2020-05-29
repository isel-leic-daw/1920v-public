
/**
 * Function used to obtain a mocked version of the service associated to the home resource
 */
export function getMockedHomeService() {
  const homeInfo = { 
    api: {
      title: "HVAC Web API",
      links: {
        author: "mailto:palbp@cc.isel.ipl.pt",
        describedBy: "https://hvac.com/api-docs/)"
      }
    },
    resources: {
      power_state: { href: "/hvac/power-state" },
      temperature: { href: "/temperature" }
    }
  }  
  
  return {
    getHomeInfo: async () => {
      console.log(`MockedHomeService.getHomeInfo()`)
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(homeInfo), 5000)
      })    
    }
  }
}

let homeServiceInstance = undefined

/**
 * Function used to obtain the service associated to the home resource. Whenever possible, 
 * the same instance is returned.
 */
export function getHomeService(homeUrl, authToken) {
  if (!homeServiceInstance || authToken !== homeServiceInstance.authToken 
          || homeUrl.toString() !== homeServiceInstance.homeUrlString) {

        homeServiceInstance = {
          homeUrlString: homeUrl.toString(),
          authToken,
          getHomeInfo: async () => {
            console.log(`HomeService.getHomeInfo()`)
            const response = await fetch(homeUrl, {
              headers: authToken ? { 'Authorization': authToken } : { }
            })
            if (response.ok)
              return await response.json()
            else {
              throw new Error(response.status === 401 ? 
                "Invalid credentials" : 
                "Could not get home resource"
              )
            }
          }
        }
      }

    return homeServiceInstance
}
