// import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api';

// import GraphQLAPI from '@aws-amplify/api-graphql';
import Observable from 'zen-observable-ts';

export default (function() {

  return {
    query: (operation: any, next?: (value: any)=>void) => {
      const request = API.graphql(graphqlOperation(operation));
      if (request instanceof Observable) {
        request.subscribe({
          next: next,
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            console.log("subscription complete");
          }
        });

        return request as Observable<object>;

      } else {
        return request as GraphQLResult<object>;
      }
    }
  }
})();
