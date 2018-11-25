import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { dateFormateForEdit } from "../../utils/dateFormate";
import {
  getOpportunity,
  updateOpportunity
} from "../../actions/opportunityActions";
import { getContacts } from "../../actions/contactActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddOpportunity extends Component {
  state = {
    contact: "",
    title: "",
    amount: "",
    probability: "",
    startDate: "",
    closeDate: "",
    description: "",
    status: 0,
    stage: 0,
    errors: {},
    contacts: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContacts();
    this.props.getOpportunity(id);
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      errors: nextProps.errors,
      contacts: nextProps.contacts.contacts
    });

    if (nextProps.opportunities.opportunity) {
      const { opportunity } = nextProps.opportunities;
      this.setState({
        contact: opportunity.contact._id,
        title: opportunity.title,
        amount: opportunity.amount,
        probability: opportunity.probability,
        startDate: opportunity.startDate,
        closeDate: opportunity.closeDate,
        description: opportunity.description
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      contact,
      title,
      amount,
      probability,
      startDate,
      closeDate,
      description,
      status,
      stage
    } = this.state;

    // Update opportunity
    const updateOpportunity = {
      contact,
      title,
      amount,
      probability,
      startDate,
      closeDate,
      description,
      status,
      stage
    };

    const { id } = this.props.match.params;

    this.props.updateOpportunity(id, updateOpportunity, this.props.history);
  }

  render() {
    const {
      contact,
      title,
      amount,
      probability,
      startDate,
      closeDate,
      description,
      errors
    } = this.state;

    const { contacts } = this.state;
    return (
      <div>
        <div className="container">
          <div className="col-sm-12 row margin-0">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-info">UPDATE OPPORTUNITY</h4>
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
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
                        <label htmlFor="">Contact</label>
                        <select
                          className={classnames("form-control", {
                            "is-invalid": errors.contact
                          })}
                          name="contact"
                          value={contact}
                          onChange={this.onChange.bind(this)}
                        >
                          <option value="">Please Select...</option>

                          {contacts &&
                            contacts.map(contact => (
                              <option key={contact._id} value={contact._id}>
                                {contact.name}
                              </option>
                            ))}
                        </select>
                        {errors.contact && (
                          <div className="invalid-feedback">
                            {errors.contact}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-sm-6">
                        <TextFieldGroup
                          label="Amount ($)"
                          name="amount"
                          value={amount}
                          onChange={this.onChange.bind(this)}
                          error={errors.amount}
                        />
                      </div>

                      <div className="form-group col-sm-6">
                        <TextFieldGroup
                          type="number"
                          label="Probability (%)"
                          name="probability"
                          value={probability}
                          onChange={this.onChange.bind(this)}
                          error={errors.probability}
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <TextFieldGroup
                          type="date"
                          label="Start Date"
                          name="startDate"
                          value={dateFormateForEdit(startDate)}
                          onChange={this.onChange.bind(this)}
                          error={errors.startDate}
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <TextFieldGroup
                          type="date"
                          label="Close Date"
                          name="closeDate"
                          value={dateFormateForEdit(closeDate)}
                          onChange={this.onChange.bind(this)}
                          error={errors.closeDate}
                        />
                      </div>

                      <div className="form-group col-sm-6">
                        <TextAreaFieldGroup
                          label="Description"
                          name="description"
                          value={description}
                          onChange={this.onChange.bind(this)}
                          error={errors.description}
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
  opportunities: state.opportunities,
  contacts: state.contacts,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getOpportunity, getContacts, updateOpportunity }
)(withRouter(AddOpportunity));
