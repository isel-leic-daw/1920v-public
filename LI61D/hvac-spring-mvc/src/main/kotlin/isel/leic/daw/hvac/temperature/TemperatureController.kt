package isel.leic.daw.hvac.temperature

import isel.leic.daw.hvac.common.*
import isel.leic.daw.hvac.common.model.Hvac
import isel.leic.daw.hvac.common.model.InvalidTemperature
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

/**
 * Controller for the Temperature resource
 */
@RestController
@RequestMapping(TEMPERATURE_PATH)
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
    fun getTargetTemperature() = TemperatureOutputModel(hvac.target.value)

    @PutMapping(TARGET_TEMPERATURE_PART, consumes = ["application/json"])
    fun putTargetTemperature(@RequestBody newTarget: TemperatureInputModel): TemperatureInfoOutputModel {
        hvac.target = newTarget.toTemperature()
        return TemperatureInfoOutputModel(hvac.current.value, hvac.target.value)
    }

    @GetMapping(CURRENT_TEMPERATURE_PART)
    fun getCurrentTemperature() = TemperatureOutputModel(hvac.current.value)

    @GetMapping
    fun getTemperature() = TemperatureInfoOutputModel(hvac.current.value, hvac.target.value)
}