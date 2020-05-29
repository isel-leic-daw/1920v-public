package pt.isel.daw.springdemo

import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import pt.isel.daw.springdemo.pipeline.argumentresolvers.ClientIpArgumentResolver
import pt.isel.daw.springdemo.pipeline.messageconverters.UriToPngMessageConverter

@Configuration
class MvcConfig(
    private val interceptors: List<HandlerInterceptor>,
    private val resolvers: List<HandlerMethodArgumentResolver>,
    private val uriToPngMessageConverter: UriToPngMessageConverter
) : WebMvcConfigurer {

    override fun addArgumentResolvers(resolverList: MutableList<HandlerMethodArgumentResolver>) {
        resolvers.forEach { resolverList.add(it) }
    }

    override fun configureMessageConverters(converters: MutableList<HttpMessageConverter<*>>) {
        converters.add(uriToPngMessageConverter)
    }

    override fun addInterceptors(registry: InterceptorRegistry) {
        interceptors.forEach { registry.addInterceptor(it) }
    }

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/examples/*")
            .allowedOrigins("https://developer.mozilla.org")
            .allowCredentials(true)
            .allowedHeaders("Authorization", "Foo")
            .maxAge(1)
            .exposedHeaders("Custom-Header")
    }

}