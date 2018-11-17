import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="page-header-image page-header-back-image" />
          <div className="content">
            <div className="container">
              <div className="col-md-4 ml-auto mr-auto">
                <div className="card card-login card-plain">
                  <form action="">
                    <div className="card-body">
                      <div className="input-group no-border">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons ui-1_email-85" />
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div className="input-group no-border">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons ui-1_lock-circle-open" />
                          </span>
                        </div>
                        <input
                          type="password"
                          placeholder="Password"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="card-footer text-center">
                      <a
                        href="#pablo"
                        className="btn btn-primary  btn-lg btn-block"
                      >
                        Login
                      </a>
                      <div className="pull-left">
                        <h6>
                          <a href="/register" className="link">
                            Create Account
                          </a>
                        </h6>
                      </div>
                      <div className="pull-right">
                        <h6>
                          <a href="#pablo" className="link">
                            Need Help?
                          </a>
                        </h6>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
