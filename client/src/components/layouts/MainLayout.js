import React, { Component } from "react";
import Header from "./Header";

export default class MainLayout extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
