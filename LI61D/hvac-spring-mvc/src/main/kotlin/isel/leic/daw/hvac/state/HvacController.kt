package isel.leic.daw.hvac.state

import isel.leic.daw.hvac.common.HVAC_PATH
import isel.leic.daw.hvac.common.POWER_STATE_PART
import isel.leic.daw.hvac.common.SIREN_MEDIA_TYPE
import isel.leic.daw.hvac.common.SirenEntity
import isel.leic.daw.hvac.common.model.Hvac
import org.springframework.web.bind.annotation.*


/**
 * Controller for the Hvac's state resource
 */
@RestController
@RequestMapping(HVAC_PATH, produces = [SIREN_MEDIA_TYPE], headers = [ "Accept=application/json"])
class HvacStateController(private val hvac: Hvac) {

    @GetMapping(POWER_STATE_PART)
    fun getPowerState() =
            PowerStateOutputModel(hvac.power.name)
                    .toSirenObject()

    @PutMapping(POWER_STATE_PART)
    fun putPowerState(@RequestBody state: PowerStateInputModel): SirenEntity<PowerStateOutputModel> {
        hvac.power = state.toPower()
        return hvac.power.toOutputModel().toSirenObject()
    }
}