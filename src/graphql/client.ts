import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_SERVER_URI, GRAPHQL_WS_SERVER_URI} from "../config";

const httpLink = new HttpLink({
    uri: GRAPHQL_SERVER_URI
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: GRAPHQL_WS_SERVER_URI,
    options: {
        reconnect: true,
    }
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});