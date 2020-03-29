package isel.leic.daw.hvac.temperature

import isel.leic.daw.hvac.common.*
import isel.leic.daw.hvac.common.model.Hvac
import isel.leic.daw.hvac.common.model.InvalidTemperature
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

/**
 * Controller for the Temperature resource
 */
@RestController
@RequestMapping(TEMPERATURE_PATH, produces = [SIREN_MEDIA_TYPE], headers = [ "Accept=application/json"])
class TemperatureController(private val hvac: Hvac) {

    @ExceptionHandler
    fun handleInvalidTemperature(ex: InvalidTemperature) =
        ResponseEntity
            .badRequest()
            .contentType(MediaType.APPLICATION_PROBLEM_JSON)
            .body(ProblemJson(
                    type = "/hvac/problems/invalid-temperature",
                    title = "Invalid temperature",
                    detail = "The specified temperature is not in the acceptable interval",
                    status = 400
            ))

    @GetMapping(TARGET_TEMPERATURE_PART)
    fun getTargetTemperature() =
            TemperatureOutputModel(hvac.target.value)
                    .toSirenObject(URI(TARGET_TEMPERATURE_PATH), listOf(SET_TARGET_TEMPERATURE_ACTION))

    @PutMapping(TARGET_TEMPERATURE_PART)
    fun putTargetTemperature(@RequestBody newTemperature: TemperatureInputModel): SirenEntity<TemperatureInfoOutputModel> {
        hvac.target = newTemperature.toTemperature()
        return TemperatureInfoOutputModel(hvac.current.value, hvac.target.value).toSirenObject()
    }

    @GetMapping(CURRENT_TEMPERATURE_PART)
    fun getCurrentTemperature() =
            TemperatureOutputModel(hvac.current.value)
                    .toSirenObject(URI(CURRENT_TEMPERATURE_PATH))

    @GetMapping
    fun getTemperature() =
            TemperatureInfoOutputModel(hvac.current.value, hvac.target.value)
                    .toSirenObject()
}