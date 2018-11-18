import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import MainLayout from "../layouts/MainLayout";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
