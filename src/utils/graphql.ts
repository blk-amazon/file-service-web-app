// import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api';

// import GraphQLAPI from '@aws-amplify/api-graphql';
import Observable from 'zen-observable-ts';

export default (function() {
  const subscriptions = [];

  return {
    query: (operation: any, next?: (value: any)=>void) => {
      const type = API.getGraphqlOperationType(operation);
      // console.log("type", type);
      
      const request = API.graphql(graphqlOperation(operation));
      // if (type === "subscription") {
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
