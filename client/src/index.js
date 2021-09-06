import React from "react";
import ReactDOM from "react-dom";

import Apolloprovider from "./ApolloProvider";

ReactDOM.render(
  <React.StrictMode>
    <Apolloprovider />
  </React.StrictMode>,
  document.getElementById("root")
);
