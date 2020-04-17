# The collection+json hypermedia type

From [http://amundsen.com/media-types/collection/]
> Collection+JSON is a JSON-based read/write hypermedia-type designed to support **management and querying of simple collections**. It is similar to the The Atom Syndication Format (RFC4287) and the The Atom Publishing Protocol (RFC5023) . However, Collection+JSON defines both the format and the semantics in a single media type. It also includes support for Query Templates and expanded write support through the use of a Write Template.

Example (from [http://amundsen.com/media-types/collection/examples/])

```
{ 
  "collection" :
  {
    "version" : "1.0",
    "href" : "http://example.org/friends/",
    
    "links" : [
      {"rel" : "feed", "href" : "http://example.org/friends/rss"}
    ],
    
    "items" : [
      {
        "href" : "http://example.org/friends/jdoe",
        "data" : [
          {"name" : "full-name", "value" : "J. Doe", "prompt" : "Full Name"},
          {"name" : "email", "value" : "jdoe@example.org", "prompt" : "Email"}
        ],
        "links" : [
          {"rel" : "blog", "href" : "http://examples.org/blogs/jdoe", "prompt" : "Blog"},
          {"rel" : "avatar", "href" : "http://examples.org/images/jdoe", "prompt" : "Avatar", "render" : "image"}
        ]
      },
      
      {
        "href" : "http://example.org/friends/msmith",
        "data" : [
          {"name" : "full-name", "value" : "M. Smith", "prompt" : "Full Name"},
          {"name" : "email", "value" : "msmith@example.org", "prompt" : "Email"}
        ],
        "links" : [
          {"rel" : "blog", "href" : "http://examples.org/blogs/msmith", "prompt" : "Blog"},
          {"rel" : "avatar", "href" : "http://examples.org/images/msmith", "prompt" : "Avatar", "render" : "image"}
        ]
      },
      
      {
        "href" : "http://example.org/friends/rwilliams",
        "data" : [
          {"name" : "full-name", "value" : "R. Williams", "prompt" : "Full Name"},
          {"name" : "email", "value" : "rwilliams@example.org", "prompt" : "Email"}
        ],
        "links" : [
          {"rel" : "blog", "href" : "http://examples.org/blogs/rwilliams", "prompt" : "Blog"},
          {"rel" : "avatar", "href" : "http://examples.org/images/rwilliams", "prompt" : "Avatar", "render" : "image"}
        ]
      }      
    ],
    
    "queries" : [
      {"rel" : "search", "href" : "http://example.org/friends/search", "prompt" : "Search",
        "data" : [
          {"name" : "search", "value" : ""}
        ]
      }
    ],

    // GET http://example.org/friends/search?search=Alice
    
    "template" : {
      "data" : [
        {"name" : "full-name", "value" : "", "prompt" : "Full Name"},
        {"name" : "email", "value" : "", "prompt" : "Email"},
        {"name" : "blog", "value" : "", "prompt" : "Blog"},
        {"name" : "avatar", "value" : "", "prompt" : "Avatar"}
        
      ]
    }
  } 
}
```

Highlights
- Explicit support for _profiles_ (see [https://tools.ietf.org/html/rfc6906])
  - E.g.: as a media-type **parameter**: `Content-Type: application/vnd.collection+json;profile=http://schema.org/Person`
  - E.g.: as a Link header: `Link: <http://schema.org/Person>; rel="profile"
  - E.g.: as a link inside the representation:
  ```
   "links" : [
      {"rel" : "profile", "href" : "http://schema.org/Person"}
   ]
  ```

- Properties are represented by objects and not by fields:
  - Instead of: `"title":"Web Application Development"`
  - it uses:`{"name":"title", "value":"Web Application Development"}`
  - Seems _odd_ and more verbose. However it allows adding metadata on the property.
    - Example: `{"name":"title", "value":"Desenvolvimento de Aplicações Web", "prompt": "Nome", "lang":"pt"}`

- Fields:
  - `href` - property similar to a _self_ link.

  - `links` - collection links (i.e. links where the context is the collection)

  - `items` - field has an array of objects, where each one has
    - `href` - the URI for the item
    - `data` - array with the item properties
    - `links` - array with the items links (i.e. links where the context is the item)

  - `queries` - safe parameterized actions.

  - `template` - template for item creation.

- Also used to represent a single item
  - `items` array has only one object

- Media-type defines how to create, update, and delete
  - The creation is important!
  - The update and delete are already defined by HTTP (except for update format).

> To create a new item in the collection, the client first uses the template object to compose a valid item representation and then uses HTTP POST to send that representation to the server for processing.

> To update an existing resource, the client uses the template object as a guide to composing a replacement item representation and then uses HTTP PUT to send that representation to the server.

> Clients can delete existing resources by sending an HTTP DELETE request to the URI of the item resource.

Extensibility:
- https://github.com/collection-json/extensions
- https://github.com/collection-json/extensions/blob/master/read-only.md




```
"title":"Web Application Development"
```

```
"title":{
  "value":"Web Application Development",
  "label":"Título"
}
```


```
{"name":"title", "value":"Web Application Development"}
```

```
{"name":"title", "value":"Desenvolvimento de Aplicações Web", "label": "Título", "lang":"pt"}
```