package isel.leic.daw.hvac.home

import isel.leic.daw.hvac.common.HVAC_PATH
import isel.leic.daw.hvac.common.HVAC_STATE_PATH
import isel.leic.daw.hvac.common.JSON_HOME_MEDIA_TYPE
import isel.leic.daw.hvac.common.TEMPERATURE_PATH
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI


@RestController
class Home {

    @GetMapping(value = [HVAC_PATH], produces = [JSON_HOME_MEDIA_TYPE])
    fun getNavigation(): Navigation {
        return Navigation(
                ApiInfo("HVAC Web API", mapOf(
                        "author" to URI("mailto:palbp@cc.isel.ipl.pt"),
                        "describedBy" to URI("https://hvac.com/api-docs/)"))
                ),
                Resources(
                        power_state = NavigationLink(HVAC_STATE_PATH),
                        temperature = NavigationLink(TEMPERATURE_PATH)
                )
        )
    }
}