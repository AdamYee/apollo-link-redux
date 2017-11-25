# apollo-link-redux
Dispatches apollo-client 1.0-ish actions.

### Why?

While there are still Apollo Client 1.0 applications out there in the wild,
this provides a little shim to back fill redux actions previously dispatched in
Apollo Client 1.0 as you [migrate to Apollo Client 2.0](https://www.apollographql.com/docs/react/2.0-migration.html)(for React).

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
```
