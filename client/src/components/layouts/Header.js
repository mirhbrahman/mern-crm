import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-info">
          <div className="container margin-0 max-width-100">
            <div className="navbar-translate">
              <Link className="navbar-brand" to="/dashboard">
                CRM
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#example-navbar-info"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <div className="collapse navbar-collapse" id="example-navbar-info">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/organizations">
                    <p>Organization</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leads">
                    <p>Leads</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contacts">
                    <p>Contacts</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/opportunities">
                    <p>Opportunity</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/proposals">
                    <p>Proposal</p>
                  </Link>
                </li> */}
                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                  >
                    <i
                      className="now-ui-icons ui-1_settings-gear-63"
                      aria-hidden="true"
                    />
                  </Link>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link className="dropdown-item" to="#">
                      Account
                    </Link>
                    <div className="divider" />
                    <Link
                      onClick={this.onLogoutClick.bind(this)}
                      className="dropdown-item text-danger"
                      to="#"
                    >
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(
  null,
  { logoutUser, clearCurrentProfile }
)(Header);
