import React from "react";
import App from "./App";
import {
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  ApolloClient,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: { authorization: token ? `Bearer ${token}` : "" },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Apolloprovider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Apolloprovider;
