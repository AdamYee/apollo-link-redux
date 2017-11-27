# apollo-link-redux
Dispatches apollo-client 1.0-ish actions.

### Why?

While there are still Apollo Client 1.0 applications out there in the wild,
this provides a little shim to back fill redux actions previously dispatched in
Apollo Client 1.0 as you [migrate to Apollo Client 2.0](https://www.apollographql.com/docs/react/2.0-migration.html).
(This link is framework agnostic despite the reference to React migration docs).

[apollo-link-redux](https://www.npmjs.com/package/apollo-link-redux) is intended to compliment apps that also use redux.
It is not encouraging that redux also manage application state of GraphQL
query and mutation responses. That is a job done much better by an
Apollo Client [cache](https://www.apollographql.com/docs/react/basics/caching.html).

### Supported Actions
```javascript
APOLLO_QUERY_INIT
APOLLO_QUERY_RESULT
APOLLO_MUTATION_INIT
APOLLO_MUTATION_RESULT
```
All actions have `operationName`, `variables` and `document`.
`*_RESULT` actions will also contain `result`.

### Usage
```bash
npm i -S apollo-link-redux
```

```javascript
import { ApolloClient } from 'apollo-client';
import ReduxLink from 'apollo-link-redux';
import { HttpLink } from 'apollo-link-http';

const link = ApolloLink.from([
  new ReduxLink(store),
  new HttpLink()
]);

const client = new ApolloClient({ link });
```
