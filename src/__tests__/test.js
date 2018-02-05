import {
  ApolloLink,
  execute,
  Observable
} from 'apollo-link';
import {
  APOLLO_QUERY_INIT,
  APOLLO_QUERY_RESULT,
  ReduxLink
} from '../index';
import gql from 'graphql-tag';
import { createStore } from 'redux';

const sampleQuery = gql`
    query SampleQuery {
        stub {
            id
        }
    }
`;

const store = createStore((state = {}, action) => {
  switch (action.type) {
    case APOLLO_QUERY_INIT:
      return {
        ...state,
        init: {
          operationName: action.operationName
        }
      };
    case APOLLO_QUERY_RESULT:
      return {
        ...state,
        result: {
          operationName: action.operationName
        }
      };
    default:
      return state;
  }
});

describe('ReduxLink', () => {
  it('dispatches actions with operationName', done => {
    const variables = { fooVariables: 'barVariables' };
    const reduxLink = new ReduxLink(store);
    const mockLink = new ApolloLink(operation => Observable.of({ fooData: 'barData' }));
    const link = ApolloLink.from([
      reduxLink,
      mockLink
    ]);
    execute(link, { query: sampleQuery, variables }).subscribe(() => {
      expect(store.getState().init.operationName).toBe('SampleQuery');
      expect(store.getState().result.operationName).toBe('SampleQuery');
      done();
    });
  });
});
