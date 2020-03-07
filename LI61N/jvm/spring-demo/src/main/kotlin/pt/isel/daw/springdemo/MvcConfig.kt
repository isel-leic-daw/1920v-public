package pt.isel.daw.springdemo

import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import pt.isel.daw.springdemo.pipeline.argumentresolvers.ClientIpArgumentResolver
import pt.isel.daw.springdemo.pipeline.messageconverters.UriToPngMessageConverter

@Configuration
class MvcConfig(
    private val interceptors : List<HandlerInterceptor>
) : WebMvcConfigurer {

    override fun addArgumentResolvers(resolvers: MutableList<HandlerMethodArgumentResolver>) {
        resolvers.add(ClientIpArgumentResolver())
    }

    override fun configureMessageConverters(converters: MutableList<HttpMessageConverter<*>>) {
        //converters.add(uriToPngMessageConverter)
    }

    override fun addInterceptors(registry: InterceptorRegistry) {
        interceptors.forEach { registry.addInterceptor(it) }
    }

}