import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ errors: nextProps.errors });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, password, passwordConfirm } = this.state;
    const newUser = {
      name,
      email,
      password,
      passwordConfirm
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="page-header">
          <div className="page-header-image page-header-back-image" />
          <div className="content">
            <div className="container">
              <div className="col-md-4 ml-auto mr-auto">
                <div className="card card-login card-plain">
                  <div className="card-body">
                    <form onSubmit={this.onSubmit.bind(this)}>
                      <div className="input-group no-border">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons users_circle-08" />
                          </span>
                        </div>
                        <input
                          name="name"
                          type="text"
                          className={classnames("form-control", {
                            "is-invalid": errors.name
                          })}
                          placeholder="Name"
                          value={this.state.name}
                          onChange={this.onChange.bind(this)}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>

                      <div className="input-group no-border">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons ui-1_email-85" />
                          </span>
                        </div>
                        <input
                          name="email"
                          type="email"
                          className={classnames("form-control", {
                            "is-invalid": errors.email
                          })}
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.onChange.bind(this)}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                      <div className="input-group no-border">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons ui-1_lock-circle-open" />
                          </span>
                        </div>
                        <input
                          name="password"
                          type="password"
                          className={classnames("form-control", {
                            "is-invalid": errors.email
                          })}
                          placeholder="Pasword"
                          value={this.state.password}
                          onChange={this.onChange.bind(this)}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="input-group no-border">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons ui-1_lock-circle-open" />
                          </span>
                        </div>
                        <input
                          name="passwordConfirm"
                          type="password"
                          className={classnames("form-control", {
                            "is-invalid": errors.email
                          })}
                          placeholder="Confirm Password"
                          value={this.state.passwordConfirm}
                          onChange={this.onChange.bind(this)}
                        />
                        {errors.passwordConfirm && (
                          <div className="invalid-feedback">
                            {errors.passwordConfirm}
                          </div>
                        )}
                      </div>
                      <div className="card-footer text-center">
                        <input
                          className="btn btn-primary  btn-lg btn-block"
                          type="submit"
                          value="Get Started"
                        />
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
