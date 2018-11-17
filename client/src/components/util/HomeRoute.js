import React from "react";
import { Route } from "react-router-dom";
import AltLayout from "../layouts/AltLayout";

const HomeRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <div>
        <AltLayout>
          <Component {...props} />
        </AltLayout>
      </div>
    )}
  />
);

export default HomeRoute;
