import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const userData = {
      email,
      password
    };
    this.props.loginUser(userData);
  }
  render() {
    const { email, password, errors } = this.state;
    return (
      <div>
        <div className="page-header">
          <div className="page-header-image page-header-back-image" />
          <div className="content">
            <div className="container">
              <div className="col-md-4 ml-auto mr-auto">
                <div className="card card-login card-plain">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="card-body">
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
                          value={email}
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
                            "is-invalid": errors.password
                          })}
                          placeholder="Password"
                          value={password}
                          onChange={this.onChange.bind(this)}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card-footer text-center">
                      <input
                        className="btn btn-primary  btn-lg btn-block"
                        type="submit"
                        value="Login"
                      />
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
