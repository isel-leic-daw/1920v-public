package isel.leic.daw.hvac

import com.fasterxml.jackson.databind.ObjectMapper
import isel.leic.daw.hvac.common.APPLICATION_JSON
import isel.leic.daw.hvac.common.TEMPERATURE_PATH
import org.hamcrest.Matchers.instanceOf
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get

@SpringBootTest
@AutoConfigureMockMvc
class TemperatureTests {

    @Autowired
    private lateinit var mvc: MockMvc
    @Autowired
    private lateinit var mapper: ObjectMapper

    @Test
    fun getTargetTemperature_shouldReturn200AndATemperaturePayload() {

        val result = mvc.perform(
                get(TEMPERATURE_PATH)
                .accept(APPLICATION_JSON)
            )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.content().contentTypeCompatibleWith(APPLICATION_JSON))
            .andReturn()

        val temperature = mapper.readValue(result.response.contentAsByteArray, TemperatureDto::class.java)
        assertThat(temperature, instanceOf(TemperatureDto::class.java))
    }

}