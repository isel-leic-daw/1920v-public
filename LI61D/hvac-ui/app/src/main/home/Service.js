
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

/**
 * Function used to obtain the service associated to the home resource
 */
export function getHomeService(homeUrl) {
  return {
    getHomeInfo: async () => {
      console.log(`HomeService.getHomeInfo()`)
      const response = await fetch(homeUrl)
      return await response.json()
    }
  }
}
