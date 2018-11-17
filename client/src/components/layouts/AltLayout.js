import React, { Component } from "react";
import AuthNavbar from "./AuthNavbar";
import AuthFooter from "./AuthFooter";

class AltLayout extends Component {
  render() {
    return (
      <div>
        <AuthNavbar />
        {this.props.children}
        <AuthFooter />
      </div>
    );
  }
}
export default AltLayout;
