import { ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

export const APOLLO_QUERY_INIT = 'APOLLO_QUERY_INIT';
export const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
export const APOLLO_MUTATION_INIT = 'APOLLO_MUTATION_INIT';
export const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
export const APOLLO_SUBSCRIPTION_INIT = 'APOLLO_SUBSCRIPTION_INIT';
export const APOLLO_SUBSCRIPTION_RESULT = 'APOLLO_SUBSCRIPTION_RESULT';

const payload = ({
  operationName,
  variables,
  query
}) => ({
  operationName,
  variables,
  document: query
});

const initAction = type => operation => ({
  type,
  ...payload(operation)
});

const resultAction = type => (result, operation) => ({
  type,
  result,
  ...payload(operation)
});

export const queryInit = initAction(APOLLO_QUERY_INIT);
export const queryResult = resultAction(APOLLO_QUERY_RESULT);
export const mutationInit = initAction(APOLLO_MUTATION_INIT);
export const mutationResult = resultAction(APOLLO_MUTATION_RESULT);
export const subscriptionInit = initAction(APOLLO_SUBSCRIPTION_INIT);
export const subscriptionResult = resultAction(APOLLO_SUBSCRIPTION_RESULT);

const isQuery = op => op === 'query';
const isMutation = op => op === 'mutation';
const isSubscription = op => op === 'subscription';

export class ReduxLink extends ApolloLink {
  /**
   * @param store - redux store
   */
  constructor(store) {
    super();
    this.store = store;
  }
  request(operation, forward) {
    const observer = forward(operation);
    const definition = getMainDefinition(operation.query);
    if (isQuery(definition.operation)) {
      this.store.dispatch(queryInit(operation));
    }
    else if (isMutation(definition.operation)) {
      this.store.dispatch(mutationInit(operation));
    }
    else if (isSubscription(definition.operation)) {
      this.store.dispatch(subscriptionInit(operation));
    }
    return observer.map(result => {
      if (isQuery(definition.operation)) {
        this.store.dispatch(queryResult(result, operation));
      }
      else if (isMutation(definition.operation)) {
        this.store.dispatch(mutationResult(result, operation));
      }
      else if (isSubscription(definition.operation)) {
        this.store.dispatch(subscriptionResult(result, operation));
      }
      return result;
    });
  }
}

export default ReduxLink;
