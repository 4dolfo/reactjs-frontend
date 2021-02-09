import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


const urlGraphQL = "http://localhost:5000/graphql";

const httplink = new HttpLink({
   uri:urlGraphQL, 
});

const client = new ApolloClient({
    link:httplink,
    cache: new InMemoryCache(),
});

export default client;