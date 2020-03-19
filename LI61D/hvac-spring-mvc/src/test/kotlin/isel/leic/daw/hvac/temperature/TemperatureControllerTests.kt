package isel.leic.daw.hvac.temperature

import com.fasterxml.jackson.databind.ObjectMapper
import isel.leic.daw.hvac.common.CURRENT_TEMPERATURE_PATH
import isel.leic.daw.hvac.common.TARGET_TEMPERATURE_PATH
import isel.leic.daw.hvac.common.TEMPERATURE_PATH
import org.hamcrest.CoreMatchers.instanceOf
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class TemperatureControllerTests {

    @Autowired
    private lateinit var mvc: MockMvc
    @Autowired
    private lateinit var mapper: ObjectMapper

    @Test
    fun getTemperature_shouldReturn200AndATemperatureInfoOutputModelPayload() {

        val result = mvc.perform(
                        get(TEMPERATURE_PATH)
                        .accept(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.status().isOk)
                    .andExpect(MockMvcResultMatchers.content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                    .andReturn()

        val temperature = mapper.readValue(result.response.contentAsByteArray, TemperatureInfoOutputModel::class.java)
        assertThat(temperature, instanceOf(TemperatureInfoOutputModel::class.java))
    }

    @Test
    fun getTargetTemperature_shouldReturn200AndATemperatureOutputModelPayload() {

        val result = mvc.perform(
                        get(TARGET_TEMPERATURE_PATH)
                        .accept(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.status().isOk)
                    .andExpect(MockMvcResultMatchers.content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                    .andReturn()

        val temperature = mapper.readValue(result.response.contentAsByteArray, TemperatureOutputModel::class.java)
        assertThat(temperature, instanceOf(TemperatureOutputModel::class.java))
    }

    @Test
    fun putTargetTemperature_withValidPayload_shouldReturn200() {
        mvc.perform(
                put(TARGET_TEMPERATURE_PATH)
                .contentType(MediaType.APPLICATION_JSON).content("{ \"value\": 23 } ")
            )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun putTargetTemperature_withUnknownPropertyName_shouldReturn400AndAProblemJson() {
        mvc.perform(
                put(TARGET_TEMPERATURE_PATH)
                    .contentType(MediaType.APPLICATION_JSON).content("{ \"unknown\": 23 } ")
            )
            .andExpect(MockMvcResultMatchers.status().`is`(400))
            .andExpect(MockMvcResultMatchers.content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
    }

    @Test
    fun getCurrentTemperature_shouldReturn200AndATemperatureOutputModelPayload() {
        TODO()
    }

}