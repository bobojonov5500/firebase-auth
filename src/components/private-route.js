import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
