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
APOLLO_SUBSCRIPTION_INIT
APOLLO_SUBSCRIPTION_RESULT
```
All actions have `operationName`, `variables` and `document`.
`*_RESULT` actions will also contain `result`.

### Setup

```bash
npm i -S apollo-link-redux
```

(peer dependencies)
```bash
npm i -S apollo-link graphql
```

```javascript
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import ReduxLink from 'apollo-link-redux';
import { HttpLink } from 'apollo-link-http';

const link = ApolloLink.from([
  new ReduxLink(store),
  new HttpLink()
]);

const client = new ApolloClient({ link });
```

### Example usage

```javascript
import { APOLLO_MUTATION_RESULT } from 'apollo-link-redux';

export function mutationFooCounter(state = {
  count: 0
}, action) {
  if (
    action.operationName === 'MutateFoo' &&
    action.type === APOLLO_MUTATION_RESULT
  ) {
    const count = state.count + 1;
    return { count };
  }
  return state;
}
```

### Tests

```bash
npm test
```

### Support

- [> 1%](http://browserl.ist/?q=%3E+1%25) market share browsers.
