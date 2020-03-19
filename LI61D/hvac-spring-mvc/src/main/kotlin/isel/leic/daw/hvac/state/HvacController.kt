package isel.leic.daw.hvac.state

import isel.leic.daw.hvac.common.HVAC_PATH
import isel.leic.daw.hvac.common.POWER_STATE_PART
import isel.leic.daw.hvac.common.model.Hvac
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


/**
 * Controller for the Hvac's state resource
 */
@RestController
@RequestMapping(HVAC_PATH)
class HvacStateController(private val hvac: Hvac) {

    @GetMapping(POWER_STATE_PART)
    fun getPowerState() = PowerStateOutputModel(hvac.power.name)

    @PutMapping(POWER_STATE_PART)
    fun putPowerState(state: PowerStateInputModel) {
        hvac.power = state.toPower()
    }
}