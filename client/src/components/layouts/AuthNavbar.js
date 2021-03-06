import React, { Component } from "react";
import { Link } from "react-router-dom";

class AuthNavbar extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent "
          color-on-scroll="400"
        >
          <div className="container">
            <div className="dropdown button-dropdown">
              <Link
                to="#pablo"
                className="dropdown-toggle"
                id="navbarDropdown"
                data-toggle="dropdown"
              >
                <span className="button-bar" />
                <span className="button-bar" />
                <span className="button-bar" />
              </Link>
            </div>
            <div className="navbar-translate">
              <Link
                className="navbar-brand"
                to="/"
                rel="tooltip"
                title=""
                data-placement="bottom"
              >
                CRM
              </Link>
              <button
                className="navbar-toggler navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navigation"
                aria-controls="navigation-index"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-bar top-bar" />
                <span className="navbar-toggler-bar middle-bar" />
                <span className="navbar-toggler-bar bottom-bar" />
              </button>
            </div>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navigation"
              data-nav-image="assets/img/blurred-image-1.jpg"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default AuthNavbar;
