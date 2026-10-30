import React from "react";
import { createRoot } from "react-dom/client";

import Apolloprovider from "./ApolloProvider";

createRoot(document.getElementById("root")).render(<Apolloprovider />);
