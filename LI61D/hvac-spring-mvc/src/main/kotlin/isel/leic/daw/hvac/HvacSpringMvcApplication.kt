package isel.leic.daw.hvac

import com.fasterxml.jackson.databind.DeserializationFeature
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableWebMvc
class ApiConfig : WebMvcConfigurer {
	override fun extendMessageConverters(converters: MutableList<HttpMessageConverter<*>>) {
		val converter = converters.find {
			it is MappingJackson2HttpMessageConverter
		} as MappingJackson2HttpMessageConverter
		converter.objectMapper.enable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
	}
}

@SpringBootApplication
class HvacSpringMvcApplication

fun main(args: Array<String>) {
	runApplication<HvacSpringMvcApplication>(*args)
}
