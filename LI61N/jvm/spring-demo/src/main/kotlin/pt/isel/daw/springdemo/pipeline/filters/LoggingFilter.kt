package pt.isel.daw.springdemo.pipeline.filters

import org.springframework.stereotype.Component
import pt.isel.daw.springdemo.utils.loggerFor
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpFilter
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

private val log = loggerFor<LoggingFilter>()

@Component
class LoggingFilter : HttpFilter() {

    override fun doFilter(
            request: HttpServletRequest,
            response: HttpServletResponse,
            chain: FilterChain) {

        val req = request
        val id = UUID.randomUUID()
        log.info("http_in_start method={}, uri={}, id={}", req.method, req.requestURI, id)
        req.setAttribute("id", id)
        chain.doFilter(request, response)
        val resp = response
        log.info("http_in_end method={}, uri={}, status={}, id={}",
                req.method, req.requestURI, resp.status, id)
    }
}