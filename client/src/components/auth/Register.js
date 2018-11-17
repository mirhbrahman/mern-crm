import React from "react";

const Register = () => {
  return (
    <div>
      <div className="page-header">
        <div className="page-header-image page-header-back-image" />
        <div className="content">
          <div className="container">
            <div className="col-md-4 ml-auto mr-auto">
              <div className="card card-login card-plain">
                <div className="card-body">
                  <form action="">
                    <div className="input-group no-border">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="now-ui-icons users_circle-08" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>

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
                        className="form-control"
                        placeholder="Pasword"
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
                        className="form-control"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center">
                  <a
                    href="#pablo"
                    className="btn btn-primary  btn-lg btn-block"
                  >
                    Get Started
                  </a>
                  <div className="pull-left">
                    <h6>
                      <a href="/login" className="link">
                        Already have an account
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
