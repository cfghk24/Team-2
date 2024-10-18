import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import PrivateRoute from "./PrivateRoute";  // Import the PrivateRoute component

ReactDOM.render(
  <HashRouter>
    <Switch>
      {/* Route to check if user is signed in, redirect to /admin/home or /auth/signup */}
      <PrivateRoute exact path={`/`} component={AdminLayout} />
      
      {/* Auth routes */}
      <Route path={`/auth`} component={AuthLayout} />

      {/* Admin routes */}
      <Route path={`/admin`} component={AdminLayout} />

      {/* Catch all - fallback redirect to /admin/home if no specific path matches */}
      <Redirect from={`/`} to="/admin/home" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
