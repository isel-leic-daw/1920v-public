package isel.leic.daw.hvac

/**
 * The HVAC implementation
 *
 * @constructor Initiates an instance with the specified dependencies
 */
class Hvac(
    private val sensor: Sensor,
    private val cooler: Cooler,
    private val heater: Heater
) {

    /**
     * The current temperature
     */
    val current: Temperature
        get() = sensor.temperature

    /**
     * The HVAC's enabled state. It can be either turned on ([EnabledState.ON]), in which case it will be regulating
     * the environment's temperature, or turned off ([EnabledState.OFF]), doing nothing and therefore being
     * environmentally neutral ;)
     */
    var enabledState: EnabledState = EnabledState.OFF

    /**
     * The target temperature, that is, the desired environment temperature
     */
    var target: Temperature = Temperature.HUMAN_COMFORT
        set(value) {
            if (enabledState == EnabledState.OFF || value isApproximateTo current) {
                return
            }
            field = value
            // TODO:
        }
}