import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-info">
          <div className="container margin-0 max-width-100">
            <div className="navbar-translate">
              <a className="navbar-brand" href="#pablo">
                CRM
              </a>
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
                  <a className="nav-link" href="leads.html">
                    <p>Leads</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contacts.html">
                    <p>Contacts</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="opporturity.html">
                    <p>Opportunity</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="proposal.html">
                    <p>Proposal</p>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                  >
                    <i
                      className="now-ui-icons ui-1_settings-gear-63"
                      aria-hidden="true"
                    />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-header">Dropdown header</a>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                    <div className="divider" />
                    <a className="dropdown-item" href="#">
                      Separated link
                    </a>
                    <div className="divider" />
                    <a className="dropdown-item" href="#">
                      One more separated link
                    </a>
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

export default Header;
