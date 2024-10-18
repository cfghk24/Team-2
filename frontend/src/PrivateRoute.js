import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  return (
    <Route
      {...rest}
      render={(props) =>
        userId && username ? (
          <Redirect to="/admin/home" />  // Redirect to /admin/home if signed in
        ) : (
          <Redirect to="/auth/signup" />  // Redirect to sign-up if not signed in
        )
      }
    />
  );
};

export default PrivateRoute;
