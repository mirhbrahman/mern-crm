import React, { Component } from "react";

class AuthFooter extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="container">
            <nav>
              <ul>
                <li>
                  <a href="https://www.creative-tim.com">Creative Tim</a>
                </li>
                <li>
                  <a href="http://presentation.creative-tim.com">About Us</a>
                </li>
                <li>
                  <a href="http://blog.creative-tim.com">Blog</a>
                </li>
              </ul>
            </nav>
            <div className="copyright" id="copyright">
              &copy; 2018 CRM
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default AuthFooter;
