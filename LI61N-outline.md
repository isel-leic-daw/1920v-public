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
