package isel.leic.daw.hvac.home

import com.fasterxml.jackson.annotation.JsonInclude
import java.net.URI

/**
 * Output model used to describe the API's navigation links, as specified in [json-home](https://mnot.github.io/I-D/json-home/).
 */
data class Navigation(val api: ApiInfo, val resources: Resources)

/**
 * Used to describe the set of resources reachable from the home resource.
 */
data class Resources(
        val power_state: NavigationLink,
        val temperature: NavigationLink
)

/**
 * Used in the [Navigation] output model and contains the API information.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
data class ApiInfo(val title: String, val links: Map<String, URI>?)

/**
 * Used in the [Navigation] output model and contains the link to a resource.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
data class NavigationLink(val href: String?, val hrefTemplate: String?, val hrefVars: Map<String, String>?) {
    constructor(href: String) : this(href, null, null)
    constructor(hrefTemplate: String, hrefVars: Map<String, String>) : this(null, hrefTemplate, hrefVars)
}

