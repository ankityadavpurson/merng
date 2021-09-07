import React from "react";
import App from "./App";
import {
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  ApolloClient,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const baseUrl =
  process.env.NODE_ENV !== "development"
    ? ""
    : process.env.REACT_APP_API_BASE_URL;

const httpLink = createHttpLink({
  uri: baseUrl + "/graphql",
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
