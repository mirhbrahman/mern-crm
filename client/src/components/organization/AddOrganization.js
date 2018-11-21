import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { addOrganization } from "../../actions/organizationAction";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddOrganization extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    website: "",
    primaryAddress: "",
    secondaryAddress: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ errors: nextProps.errors });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      name,
      email,
      phone,
      website,
      primaryAddress,
      secondaryAddress
    } = this.state;

    // Create new org
    const newOrg = {
      name,
      email,
      phone,
      website,
      primaryAddress,
      secondaryAddress
    };

    this.props.addOrganization(newOrg, this.props.history);
  }

  render() {
    const {
      name,
      email,
      phone,
      website,
      primaryAddress,
      secondaryAddress,
      errors
    } = this.state;
    return (
      <div>
        <div className="container">
          <div className="col-sm-12 row margin-0">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-info">ADD ORGANIZATION</h4>
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <TextFieldGroup
                          label="Name"
                          name="name"
                          value={name}
                          onChange={this.onChange.bind(this)}
                          error={errors.name}
                        />
                      </div>

                      <div className="form-group col-sm-6">
                        <TextFieldGroup
                          label="Email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={this.onChange.bind(this)}
                          error={errors.email}
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <TextFieldGroup
                          label="Phone"
                          name="phone"
                          value={phone}
                          onChange={this.onChange.bind(this)}
                          error={errors.phone}
                        />
                      </div>

                      <div className="form-group col-sm-6">
                        <TextFieldGroup
                          label="Website"
                          name="website"
                          value={website}
                          onChange={this.onChange.bind(this)}
                          error={errors.website}
                        />
                      </div>

                      <div className="form-group col-sm-6">
                        <TextAreaFieldGroup
                          label="Primary Address"
                          name="primaryAddress"
                          value={primaryAddress}
                          onChange={this.onChange.bind(this)}
                          error={errors.primaryAddress}
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <TextAreaFieldGroup
                          label="Secondary Address"
                          name="secondaryAddress"
                          value={secondaryAddress}
                          onChange={this.onChange.bind(this)}
                          error={errors.secondaryAddress}
                        />
                      </div>

                      <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
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
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addOrganization }
)(withRouter(AddOrganization));
