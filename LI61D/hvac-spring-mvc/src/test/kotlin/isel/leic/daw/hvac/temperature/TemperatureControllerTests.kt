package isel.leic.daw.hvac.temperature

import isel.leic.daw.hvac.common.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.put

/**
 * For more information regarding this kind of testing, see:
 * <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/testing.html#spring-mvc-test-framework">
 *     Spring Testing
 * </a> and <a href="https://github.com/jayway/JsonPath">JsonPath</a>
 *
 * <a href="https://jsonpath.com/">Json Path evaluator</a>
 */
@SpringBootTest
@AutoConfigureMockMvc
class TemperatureControllerTests {

    @Autowired
    private lateinit var mvc: MockMvc

    @Test
    fun getTemperature_shouldReturn200AndATemperatureInfoOutputModelPayload() {

        mvc.get(TEMPERATURE_PATH) {
            accept = MediaType(APPLICATION_TYPE, SIREN_SUBTYPE)
        }.andExpect {
            status { isOk }
            content { contentType(SIREN_MEDIA_TYPE) }
            jsonPath("$.class[0]") { value("TemperatureInfo") }
            jsonPath("$.properties.target") { exists() }
            jsonPath("$.properties.current") { exists() }
            jsonPath("$.links") { exists() }
            jsonPath("$.actions") { exists() }
        }
    }

    @Test
    fun getTargetTemperature_shouldReturn200AndATemperatureOutputModelPayload() {

        mvc.get(TARGET_TEMPERATURE_PATH) {
            accept = MediaType(APPLICATION_TYPE, SIREN_SUBTYPE)
        }.andExpect {
            status { isOk }
            content { contentType(SIREN_MEDIA_TYPE) }
            jsonPath("$.class[0]") { value("Temperature") }
            jsonPath("$.properties.value") { exists() }
            jsonPath("$.links") { exists() }
            jsonPath("$.actions") { exists() }
        }
    }

    @Test
    fun putTargetTemperature_withValidPayload_shouldReturn200() {

        mvc.put(TARGET_TEMPERATURE_PATH) {
            accept = MediaType(APPLICATION_TYPE, SIREN_SUBTYPE)
            contentType = MediaType.APPLICATION_JSON
            content = "{ \"value\": 25 } "
        }.andExpect {
            status { isOk }
            content { contentType(SIREN_MEDIA_TYPE) }
            jsonPath("$.class[0]") { value("TemperatureInfo") }
            jsonPath("$.properties.target") { value(25) }
            jsonPath("$.links") { exists() }
            jsonPath("$.actions") { exists() }
        }
    }

    @Test
    fun getCurrentTemperature_shouldReturn200AndATemperatureOutputModelPayload() {

        mvc.get(CURRENT_TEMPERATURE_PATH) {
            accept = MediaType(APPLICATION_TYPE, SIREN_SUBTYPE)
        }.andExpect {
            status { isOk }
            content { contentType(SIREN_MEDIA_TYPE) }
            jsonPath("$.class[0]") { value("Temperature") }
            jsonPath("$.properties.value") { exists() }
            jsonPath("$.links") { exists() }
            jsonPath("$.actions") { doesNotExist() }
        }
    }
}