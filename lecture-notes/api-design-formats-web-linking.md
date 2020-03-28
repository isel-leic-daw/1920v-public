## HTTP API design - Web Linking - RFC 8288

### The architecture of the World Wide Web

- Resources identified via URIs
- Interaction with resources (e.g. state retrieval) produces representations.
- Representations have links to other resources, via URIs
- This is what defines the `web` - the links between resources. 

### RFC 8288

> This specification defines a model for the relationships between
   resources on the Web ("links") and the type of those relationships
   ("link relation types").

```
In this specification, a link is a typed connection between two
   resources and is comprised of:

   o  a link context,
   o  a link relation type (Section 2.1),
   o  a link target, and
   o  optionally, target attributes (Section 2.2)
```

> A link can be viewed as a statement of the form "link context has a
   link relation type resource at link target, which has target
   attributes".

### Example - open search

[Tab to search](https://www.chromium.org/tab-to-search) on [Stack Overflow](https://stackoverflow.com/)
   
### Link relations

> In the simplest case, a link relation type identifies the semantics
of a link.  For example, a link with the relation type "copyright"
indicates that the current link context has a copyright resource at
the link target.

[IANA link relations registry](https://www.iana.org/assignments/link-relations/link-relations.xhtml)
* E.g. `next`, `prev`, `self`, `status`

Extension relation types

> Applications that don't wish to register a relation type can use an
   extension relation type, which is a URI [RFC3986] that uniquely
   identifies the relation type.

### Link Usages

(quotations from [https://www.oreilly.com/library/view/designing-evolvable-web/9781449337919/ch06.html#_link_relation_types])

- Replacing embedded resources
  - E.g. image of a student on a _student representation_.
  - Due to different formats.
  - Due to different _cacheability_ characteristics

- Indirection layer
  - > Links are used as a way of providing a layer of indirection. By creating discovery documents at API entry points, we can enable clients to dynamically identify the location of certain resources without having to hardcode URIs into the client application

  - OAuth 2.0 and OpenID Connect
    - Start at the OP (OpenID Provider) host name - E.g. `https://accounts.google.com/`
    - Add `/.well-known/openid-configuration` (defined in https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig)
    - The result is [https://accounts.google.com/.well-known/openid-configuration](https://accounts.google.com/.well-known/openid-configuration)

    ```
    {
      "issuer": "https://accounts.google.com",
      "authorization_endpoint": "https://accounts.google.com/o/oauth2/v2/auth",
      "device_authorization_endpoint": "https://oauth2.googleapis.com/device/code",
      (...)
    }  
    ```
    - This resource acts as a _home resource_, with links to other resources.
    - On `"authorization_endpoint": "https://accounts.google.com/o/oauth2/v2/auth"`,
      - `authorization_endpoint` acts as the link relation
      - `https://accounts.google.com/o/oauth2/v2/auth` is the URI of the target resource
    - Note that OAuth 2.0 and OpenID Connect are specifications
      - Implemented by multiple providers
      - So, they don't mandate any URI structure, other than the entry point.

  - [https://api.github.com/](https://api.github.com/)
  
- Reference data
  - > It is common in data entry user interfaces to provide the user a list of options to select from. These lists don’t need to be predefined in a client application, and in fact a client doesn’t even need to know in advance what list needs to be associated with a particular input field. By annotating an input field with a link to a list of options, a client application can generically identify the valid list of items without any knowledge of the input domain.

- Workflow
  - > Probably one of the most unique features of REST-based systems is the way that application workflow is defined and communicated. In RPC-based systems, the client must understand the application interaction protocol. For example, it must know that it has to call open before it calls send and close when it has finished. These rules have to be baked into the clients and any dynamic detection of state must be built ad hoc.

  - E.g. Possible next states for an issue depends on the current state, on the project's state graph, and eventually on the requesting user.
 
### Example

Once upon a time there was an API

#### Version A

```
{
  "title": "Alice's Adventures in Wonderland",
  "author": "Lewis Carrol",
  "offers": [
    {
      "offerId": "12345",
      "title": "softcover edition",
      "price": 12
      "currency": "EUR"
    },
    {
      "offerId": "123456",  
      "title": "hardcover edition",
      "price": 21
      "currency": "EUR"
    }
  ]
}
```

To purchase an offer, do a POST to `https://examples.org/shop/offers/purchase/{offerId}`
- Hard-coded knowledge on the application!

#### Version B

Using links

```
{
  "title": "Alice's Adventures in Wonderland",
  "author": "Lewis Carrol",
  "offers": [
    {
      "offerId": "12345",
      "title": "softcover edition",
      "price": 12
      "currency": "EUR"
      "actions" : [{
        "rel": "https://example.org/rels/purchase",
        "method": "POST",
        "href": "https://examples.org/shop/offers/purchase/12345"
      }]
    },
    {
      "offerId": "123456",  
      "title": "hardcover edition",
      "price": 21
      "currency": "EUR",
      "actions" : [{
        "rel": "https://example.org/rels/purchase",
        "method": "POST"
        "href": "https://examples.org/shop/offers/purchase/123456"
      }]
    }
  ]
}
```

To purchase an offer, use the action with rel=`purchase`
- No hard-coded URI template on the application

Much bigger payload.

#### New business requirement

Offers are not static and may depend on promotion campaigns and on the current user. So, when purchasing an item the API needs to know the 
order ID and also the promotion ID.

#### Version A

Problem: extra information breaks the client hard-coded URI template `https://examples.org/shop/offers/purchase/{offerId}`
  - Change the client application to change the URI template
  - Encode both the offer ID and promotion ID in the same ID and call it offer ID
    - This is how development "horror stories" begin

#### Version B

Just change the purchase URI on the product representation.

```
{
  "title": "Alice's Adventures in Wonderland",
  "author": "Lewis Carrol",
  "offers": [
    {
      "offerId": "12345",
      "title": "softcover edition",
      "price": 12
      "currency": "EUR"
      "actions" : [{
        "rel": "https://example.org/rels/purchase",
        "method": "POST",
        "href": "https://examples.org/shop/offers/purchase/12345/promotion/abc"
      }]
    },
    {
      "offerId": "123456",  
      "title": "hardcover edition",
      "price": 21
      "currency": "EUR",
      "actions" : [{
        "rel": "https://example.org/rels/purchase",
        "method": "POST"
        "href": "https://examples.org/shop/offers/purchase/123456/promotion/xyz"
      }]
    }
  ]
}
```

So, it is worthwhile? Well, it depends.

#### Link Serialisation in HTTP Headers

Example from the RFC

```
Link: <http://example.com/TheBook/chapter2>; rel="previous"; title="previous chapter"
```

[GitHub API example](https://developer.github.com/v3/#pagination)

```
Link: <https://api.github.com/user/repos?page=3&per_page=100>; rel="next",
  <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"
```

```
link: 
  <https://api.github.com/user/364600/repos?page=2>; rel="next", 
  <https://api.github.com/user/364600/repos?page=3>; rel="last"
```

The context for these links is the resource being represented by the response (where the `link`header is).

```
Link: 
 <https://api.github.com/user/364600/repos?page=1>; rel="prev", 
 <https://api.github.com/user/364600/repos?page=3>; rel="next", 
 <https://api.github.com/user/364600/repos?page=3>; rel="last", 
 <https://api.github.com/user/364600/repos?page=1>; rel="first"
```

