# Outline and resources #

## Week 1

* Syllabus, teaching methodology and bibliography.
  * [Evaluation](https://github.com/isel-leic-daw/1920v-public/wiki/evaluation)
  * [Resources](https://github.com/isel-leic-daw/1920v-public/wiki/resources)

* The [architecture of the World Wide Web](https://www.w3.org/TR/webarch/)
  * The Web as an _information space_, where the item of interest are called _resources_.
  * The three architectural bases for the Web: identification, interaction, and formats.

* The HTTP protocol
    * Implements the _interaction_ architectural base.
    * RFCs
        * [RFC 7230 - Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing](https://tools.ietf.org/html/rfc7230) - syntax, transport channel usage, and intermediaries.
        * [RFC 7231 - Hypertext Transfer Protocol (HTTP/1.1): Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content](https://tools.ietf.org/html/rfc7231) - message components and their semantics

* HTTP messages
    * [Request target](https://tools.ietf.org/html/rfc7230#section-5.3)
    * [Request method](https://tools.ietf.org/html/rfc7231#section-4)
    * [Response status code](https://tools.ietf.org/html/rfc7231#section-6)
    * Message headers
        * [Request headers](https://tools.ietf.org/html/rfc7231#section-5)
        * [Response headers](https://tools.ietf.org/html/rfc7231#section-7)
        * [Content headers](https://tools.ietf.org/html/rfc7231#section-3.1)

* The _uniform interface_ concept:
    * [Request methods are not resource-specific](https://tools.ietf.org/html/rfc7231#section-4)
    * ["HTTP is not RPC"](https://roy.gbiv.com/pubs/dissertation/evaluation.htm)

* The .NET HTTP message model (see [chapter 10 in the recommended book](https://learning.oreilly.com/library/view/designing-evolvable-web/9781449337919/ch10.html))
    * We will not be using .NET, however its HTTP message model is a good way of learning about HTTP messages.

## Week 2

* IoC and DI, DI containers, Spring, Spring MVC, Spring Boot.
  * [Spring IoC and DI container](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans). Skip over the XML configuration metadata, since we will not be using it. Focus on the Java based configuration, including annotations:
  * [Configuration classes and factory methods](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-java).
  * [Annotation based configuration](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-annotation-config).
  * [Classpath scanning](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-classpath-scanning).
  * [Spring Web MVC](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html)
    * Focus on the architectural elements, namely controllers and pipeline. The configuration will be done differently because we will be using [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-developing-web-applications).
  * [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/).
  * [Spring Initializr](https://start.spring.io).

* Code samples
  * (Spring context)[https://github.com/isel-leic-daw/1920v-public/tree/master/LI61N/jvm/spring-context]
  * (Spring MVC with Spring Boot)[https://github.com/isel-leic-daw/1920v-public/tree/master/LI61N/jvm/spring-demo]
  * (Spring MVC with Spring Boot, live coded in the classroom)[https://github.com/isel-leic-daw/1920v-public/tree/master/LI61N/jvm/demo-spring-aula]

