# HTTP conditional requests

From [https://tools.ietf.org/html/rfc7232]

> Conditional requests are HTTP requests [RFC7231] that include one or
   more header fields indicating a precondition to be tested before
   applying the method semantics to the target resource.

> Conditional GET requests are the most efficient mechanism for HTTP
   cache updates [RFC7234].  
   
>  Conditionals can also be applied to
   state-changing methods, such as PUT and DELETE, to prevent the "lost
   update" problem: one client accidentally overwriting the work of
   another client that has been acting in parallel.

## validators

- _strong_ vs _weak_ validators
> A "strong validator" is representation metadata that changes value
   whenever a change occurs to the representation data that would be
   observable in the payload body of a 200 (OK) response to GET.

> In contrast, a "weak validator" is representation metadata that might
   not change for every change to the representation data.

### Last-Modified

> An origin server SHOULD send Last-Modified for any selected
   representation for which a last modification date can be reasonably
   and consistently determined, since its use in conditional requests
   and evaluating cache freshness ([RFC7234]) results in a substantial
   reduction of HTTP traffic on the Internet and can be a significant
   factor in improving service scalability and reliability.

### ETag

> An entity-tag is an opaque validator for
   differentiating between multiple representations of the same
   resource, regardless of whether those multiple representations are
   due to resource state changes over time, content negotiation
   resulting in multiple representations being valid at the same time,
   or both.

```
+--------+--------+-------------------+-----------------+
| ETag 1 | ETag 2 | Strong Comparison | Weak Comparison |
+--------+--------+-------------------+-----------------+
| W/"1"  | W/"1"  | no match          | match           |
| W/"1"  | W/"2"  | no match          | no match        |
| W/"1"  | "1"    | no match          | match           |
| "1"    | "1"    | match             | match           |
+--------+--------+-------------------+-----------------+
```

### Precondition Header fields

- `If-Match`
  - Uses the strong comparison

> If-Match is most often used with state-changing methods (e.g., POST,
   PUT, DELETE) to prevent accidental overwrites when multiple user
   agents might be acting in parallel on the same resource (i.e., to
   prevent the "lost update" problem).

- Status codes: `200` (`OK`) or `412` (`Precondition Failed`)

- `If-None-Match`

> If-None-Match is primarily used in conditional GET requests to enable
   efficient updates of cached information with a minimum amount of
   transaction overhead.

- Status codes: `200` (`OK`) or `304` (`Not Modified`)

- `If-Modified-Since`

- `If-Unmodified-Since`


client 0: GET /resource -> 0
client 1: GET /resource -> 0
client 0: PUT /resource 1 -> 1
client 1: PUT /resource 1 -> 1 

client 0: GET /resource -> 0, ETag:abc
client 1: GET /resource -> 0, ETag:abc
client 0: PUT /resource 1 If-Match:abc -> 1 (ETag:xyz) (request is performed)
client 1: PUT /resource 1 If-Match:abc -> (request is not performed)
client 1: GET /resource -> 1, ETag:xyz
client 1: PUT /resource 2 If-Match:xyz -> 2 (Etaz:foo) (request is performed) 
