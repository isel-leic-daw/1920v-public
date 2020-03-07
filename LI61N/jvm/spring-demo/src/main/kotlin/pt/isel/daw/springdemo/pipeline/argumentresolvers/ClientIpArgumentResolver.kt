package pt.isel.daw.springdemo.pipeline.argumentresolvers

import org.springframework.core.MethodParameter
import org.springframework.web.bind.support.WebDataBinderFactory
import org.springframework.web.context.request.NativeWebRequest
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.method.support.ModelAndViewContainer
import pt.isel.daw.springdemo.data.ClientIp
import javax.servlet.http.HttpServletRequest


class ClientIpArgumentResolver : HandlerMethodArgumentResolver {

    override fun supportsParameter(parameter: MethodParameter)
        = parameter.parameterType == ClientIp::class.java

    override fun resolveArgument(
            parameter: MethodParameter,
            mavContainer: ModelAndViewContainer?,
            webRequest: NativeWebRequest, binderFactory: WebDataBinderFactory?): Any? =
        ClientIp(webRequest.getNativeRequest(HttpServletRequest::class.java)!!.remoteAddr)

}