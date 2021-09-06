import React from "react";
import ReactDOM from "react-dom";

import _ApolloProvider from "./ApolloProvider";

ReactDOM.render(
  <React.StrictMode>
    <_ApolloProvider />
  </React.StrictMode>,
  document.getElementById("root")
);
