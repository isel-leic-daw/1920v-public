## HTTP API design

HTTP API aka Web APIs
  Remote/network APIs using the Web architecture
  Remote/network APIs using HTTP as an application level protocol

Design
  Internal
  - URI and path design
  Public
  - Contract

### Web architecture

> "information space in which the **items of interest**, referred to as **resources**, are identified by global identifiers called Uniform Resource Identifiers"

Takeaway: resources identified by URIs

>"The three architectural bases": identification, interaction, and format

Identification:
  - Using URIs as **global** and **uniform** identifiers

Interaction:
  >Web agents communicate using standardized protocols that enable interaction through the exchange of messages which adhere to a defined syntax and semantics
  - Using the HTTP protocol

Formats:
  - Transferring resource state **representations** using formats

From an API design perspective:
  - Use URI
  - Use URI templates as way to define the construction of URIs [https://tools.ietf.org/html/rfc6570]
    path + path template -> no-match | match + [(name, value)]
    URI template + [(name, value)] -> URI
    http://example.com/search{?q,lang} + [(q,aaa), (lang, en)] 
      -> http://example.com/search?q=aaa&lang=en
  - Use HTTP
    - Known the HTTP model
    - Don't break the HTTP requirements
      - E.g. Don't use the `GET` method for _unsafe_ operations
    - Take advantage of HTTP features
      - E.g. Use `GET` for _safe_ resource state retrieval
      - E.g. Use HTTP caching
      - E.g. Use HTTP conditional requests
    - Use HTTP _concepts_
    - Use HTTP _implementations_
  - Use or **define** new formats
    - We probably don't need a new format to represent images.
    - We probably need a new format to represent a _project_ state
      - Even if that depends of the definition of a "new format"

### HTTP

> The Hypertext Transfer Protocol (HTTP) is a stateless application-
   level request/response protocol that uses extensible semantics and
   self-descriptive message payloads for flexible interaction with
   network-based hypertext information systems

> HTTP is a stateless request/response protocol that operates by exchanging messages (…). An HTTP "client" is a program that establishes a connection to a server for the purpose of sending one or more HTTP requests. An HTTP "server" is a program that accepts connections in order to service HTTP requests by sending HTTP responses

- Exchanges messages through a connection
- Stateless
  - The interpretation of a request message does not (or should not) depend on session context
  - TODO this needs more discussion
- Client - take the initiative to establish connections and send requests
- Servers - listen to connections and service requests by producing responses
- Extensible semantics - for both request and response messages

#### Request message

Two main components
- **target** - the URI for the target resource on which the message is _applied_ 
- **method** - the operation to be performed on the target resource.

Additional components:
- request metadata - headers (name:value pairs) providing more information about the request
  - E.g.: `Accept: application/json, text/plain` (the list of accepted media-type for the response payload body)
- payload - representation using a format
  - payload metadata - headers (name:value pairs) providing more information about the payload
    - E.g.: `Content-Language: pt` (the representation language)
  - payload body - payload byte sequence

#### Response message

- **status**
> The status-code element is a 3-digit integer code describing the result of the server's attempt to understand and satisfy the client's corresponding request. The rest of the response message is to be **interpreted in light of the 
semantics defined for that status code**

- response metadata - headers (name:value pairs) providing more information about the response
  - E.g. `Cache-Control: no-store`
- payload - exactly the same as in the request
  - payload metadata 
  - payload body

#### Uniform interface

>Unlike distributed objects, the **standardized request methods in HTTP
   are not resource-specific**, since uniform interfaces provide for
   **better visibility and reuse in network-based systems** [REST].  Once
   defined, a standardized method ought to have the same semantics when
   applied to any resource, though each resource determines for itself
   whether those semantics are implemented or allowed.

>What makes HTTP significantly different from RPC is that the requests are directed to resources using a generic interface with standard semantics that can be interpreted by intermediaries almost as well as by the machines that originate services. The result is an application that allows for layers of transformation and indirection that are independent of the information origin

In https://www.ics.uci.edu/~fielding/pubs/dissertation/evaluation.htm   

#### Methods

```
   +---------+-------------------------------------------------+-------+
   | Method  | Description                                     | Sec.  |
   +---------+-------------------------------------------------+-------+
   | GET     | Transfer a current representation of the target | 4.3.1 |
   |         | resource.                                       |       |
   | HEAD    | Same as GET, but only transfer the status line  | 4.3.2 |
   |         | and header section.                             |       |
   | POST    | Perform resource-specific processing on the     | 4.3.3 |
   |         | request payload.                                |       |
   | PUT     | Replace all current representations of the      | 4.3.4 |
   |         | target resource with the request payload.       |       |
   | DELETE  | Remove all current representations of the       | 4.3.5 |
   |         | target resource.                                |       |
   | CONNECT | Establish a tunnel to the server identified by  | 4.3.6 |
   |         | the target resource.                            |       |
   | OPTIONS | Describe the communication options for the      | 4.3.7 |
   |         | target resource.                                |       |
   | TRACE   | Perform a message loop-back test along the path | 4.3.8 |
   |         | to the target resource.                         |       |
   +---------+-------------------------------------------------+-------+
```

- `POST`
  - "Perform resource-specific processing on the request payload" 
  - Means that _anything_ can be done.
  - "resource-specific" seems to go against the **uniform interface**
  - The server/resource can _do_ anything
  - An intermediary cannot _assume_ anything

- `PUT` 
  - Can be used to update or create
  - Cannot be used for partial updates
    - `PATCH` extension method can be used for partial updates

- `POST` vs. `PUT`
  - `POST https://example.com/projects` can create `https://example.com/projects/daw`
  - `PUT https://example.com/projects` can only create `https://example.com/projects`
  - With `PUT`, the client needs to know the URI of the resource _to_ create
  - With `POST`, the client need to know the URI of the resource _that create others_
    - This lets the server fully control the URI of the created resources
  - `PUT` is idempotent (more on this later)

##### Method properties

- Safe methods
> Request methods are considered "safe" if their defined semantics are
   essentially read-only; i.e., the client does not request, and does
   not expect, any state change on the origin server as a result of
   applying a safe method to a target resource.  Likewise, reasonable
   use of a safe method is not expected to cause any harm, loss of
   property, or unusual burden on the origin server.

> What is important, however, is that the client did not
   request that additional behavior and cannot be held accountable for
   it.

- Idempotent methods
> A request method is considered "idempotent" if the intended effect on
   the server of multiple identical requests with that method is the
   same as the effect for a single such request

#### Status codes

```
o 1xx (Informational): The request was received, continuing process 
o 2xx (Successful): The request was successfully received, understood, and accepted 
o 3xx (Redirection): Further action needs to be taken in order to complete the request 
o 4xx (Client Error): The request contains bad syntax or cannot be fulfilled
o 5xx (Server Error): The server failed to fulfil an apparently valid request
```

##### 1xx (Informational)

Client sends
```
PUT https://httpbin.org/put HTTP/1.1
Host: httpbin.org
Content-Type: application/json
Content-Length: 5
Expect: 100-continue
````

Server responds
```
HTTP/1.1 100 Continue
````

Client continues
```
"123"
```

Server responds
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 337
Connection: keep-alive
Server: gunicorn/19.9.0
```

##### 2xx (Success)
- `200 OK`
  - Request has succeeded
  - Body semantics depends on the request method
    - `GET` - representation of the target resource
    - `POST` -  representation of the status or results obtained from the action
    - `PUT`, `DELETE` - representation of the status of the action
    - `OPTIONS` - representation of the communications options
    - `TRACE` - representation of the request message
- `201 Created`
  - Request has been fulfilled and a resource created
    - `Location` header contains URI for the created resource
- `202 Accepted`
  - Request has been accepted for processing, but has not completed yet
  - The representation sent with this response should describe the request's current status and point to a status monitor

##### 3xx

> There are several types of redirects:
>1. Redirects that indicate the resource might be available at a different URI, as provided by the Location field, as in the status codes 301 (Moved Permanently), 302 (Found), and 307 (Temporary Redirect). 
>2. Redirection that offers a choice of matching resources, each capable of representing the original request target, as in the 300 (Multiple Choices) status code.
>3. Redirection to a different resource, identified by the Location field, that can represent an indirect response to the request, as in the 303 (See Other) status code.
>4. Redirection to a previously cached result, as in the 304 (Not Modified) status code.

In https://tools.ietf.org/html/rfc7231#section-6.4

Content negotiation:

- Proactive negotiation
  - Based on the `Accept` header
- Reactive negotiation
  - Based on the `300` status code and a choices representation

https://example.com/projects/daw
https://example.com/projects/daw?lang=en
https://example.com/projects/daw?lang=pt


##### 4xx

- 400 Bad Request
  - >server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).

- 401 Unauthorized
  - >request has not been applied because it lacks valid authentication credentials for the target resource.”
Missing or invalid credentials
- 403 Forbidden
  - >The 403 (Forbidden) status code indicates that the server understood the request but refuses to authorize it (…) If authentication credentials were provided in the request, the server considers them insufficient to grant access
- 404 Not Found
  - >The 404 (Not Found) status code indicates that the origin server did not find a current representation for the target resource or is not willing to disclose that one exists

- 405 Method Not Allowed
  - >indicates that the method received in the request-line is known by the origin server but not supported by the target resource (…) The origin server MUST generate an Allow header field in a 405 response containing a list of the target resource's currently supported methods

- 406 Not Acceptable
  - >indicates that the target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields


#### Additional error information

- There aren’t HTTP status code for all possible failure scenarios.
- Uniform interface - status code don’t have domain-specific semantics.
- What to do when needing to provide more information?
- Two common anti-patterns are:
  - Redefining the meaning of standard codes for a specific set of resources.
  - Using an unassigned status code in the 4xx or 5xx classes.

A solution is to add an error representation on the response body



### Formats


  