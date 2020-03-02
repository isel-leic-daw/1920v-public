package isel.leic.daw.hvac

import kotlin.math.abs

/**
 * Data type for representing temperatures in the context of the HVAC system. All values are expressed in
 * degrees Celsius.
 */
class Temperature private constructor(val value: Float) {

    companion object {

        val HUMAN_COMFORT = Temperature(21f)
        val MAX = Temperature(60f)
        val MIN = Temperature(-20f)

        /**
         * Factory method that returns a [Temperature] instance with the specified [value], which must be in the
         * interval [-50..50] degrees Celsius.
         *
         * @param   value   The temperature value in the interval [-50..50]
         * @return  The corresponding [Temperature] instance, or null if [value] is within the admissible interval
         */
        fun of(value: Float): Temperature? =
            if (value <= MAX.value && value >= MIN.value) Temperature(value)
            else null

        /**
         * Overload of the function call operator to have the same behavior as the [of] function
         */
        operator fun invoke(value: Float): Temperature? = of(value)
    }

    /**
     * Checks if this [Temperature] is approximately equal to [another].
     *
     * @return  a boolean value indicating if the two temperature values are approximately equal to each other. Two
     *          values are said to be 'approximately equal' if their difference is within a predetermined interval.
     */
    infix fun isApproximateTo(another: Temperature) = abs(value - another.value) <= 0.5f
}