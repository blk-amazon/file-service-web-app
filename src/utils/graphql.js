import Amplify, { API, graphqlOperation } from 'aws-amplify';

export function getResourceSubscription(query, next) {
    return API.graphql(
        graphqlOperation(query)
    ).subscribe({
        next: next,
    });
}
