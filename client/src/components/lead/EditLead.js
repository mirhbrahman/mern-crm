import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { getLead, updateLead } from "../../actions/leadActions";
import { getOrganizations } from "../../actions/organizationActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class EditLead extends Component {
  state = {
    organization: "",
    name: "",
    email: "",
    phone: "",
    website: "",
    title: "",
    department: "",
    primaryAddress: "",
    secondaryAddress: "",
    status: "",
    role: "",
    errors: {},
    orgs: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getOrganizations();
    this.props.getLead(id);
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ errors: nextProps.errors, orgs: nextProps.orgs.orgs });
    if (nextProps.leads.lead) {
      const { lead } = nextProps.leads;
      this.setState({
        organization: lead.organization._id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        website: lead.website,
        title: lead.title,
        department: lead.department,
        primaryAddress: lead.primaryAddress,
        secondaryAddress: lead.secondaryAddress,
        status: lead.status,
        role: lead.role
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      organization,
      name,
      email,
      phone,
      website,
      title,
      department,
      primaryAddress,
      secondaryAddress,
      status,
      role
    } = this.state;

    // Create new lead
    const updateLead = {
      organization,
      name,
      email,
      phone,
      website,
      title,
      department,
      primaryAddress,
      secondaryAddress,
      status,
      role
    };

    const { id } = this.props.match.params;

    this.props.updateLead(id, updateLead, this.props.history);
  }

  render() {
    const {
      organization,
      name,
      email,
      phone,
      website,
      title,
      department,
      primaryAddress,
      secondaryAddress,
      errors
    } = this.state;

    const { orgs } = this.state;
    return (
      <div>
        <div className="container">
          <div className="col-sm-12 row margin-0">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-info">UPDATE LEAD</h4>
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
                        <label htmlFor="">Organization</label>
                        <select
                          className="form-control"
                          name="organization"
                          value={organization}
                          onChange={this.onChange.bind(this)}
                        >
                          <option value="">Please Select...</option>

                          {orgs &&
                            orgs.map(org => (
                              <option
                                key={org._id}
                                value={org._id}
                                selected={org._id === organization}
                              >
                                {org.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="form-group col-sm-6">
                        <TextFieldGroup
                          label="Title"
                          name="title"
                          value={title}
                          onChange={this.onChange.bind(this)}
                          error={errors.title}
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <TextFieldGroup
                          label="Department"
                          name="department"
                          value={department}
                          onChange={this.onChange.bind(this)}
                          error={errors.department}
                        />
                      </div>

                      <div className="form-group col-sm-12">
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
                          Update
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
  orgs: state.orgs,
  leads: state.leads,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getLead, getOrganizations, updateLead }
)(withRouter(EditLead));
