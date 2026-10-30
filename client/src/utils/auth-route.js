import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/auth";

function AuthRoute({ component: Component }) {
  const authContext = useContext(AuthContext);
  return authContext.user ? <Navigate to="/" replace /> : <Component />;
}

export default AuthRoute;
