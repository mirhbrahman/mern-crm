import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { dateFormate } from "../../utils/dateFormate";
import Spinner from "../common/Spinner";
import { getContacts, deleteContact } from "../../actions/contactActions";
import { getContactOpportunities } from "../../actions/opportunityActions";

class Contact extends Component {
  state = {
    currently_selected_id: null,
    current_contacts: null
  };
  componentDidMount() {
    this.props.getContacts();
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ contacts: nextProps.contacts });
  }

  onRowSelect(id, e) {
    this.setState({ currently_selected_id: id });
    const { contacts } = this.props.contacts;
    const c_contacts = contacts.filter(org => org._id === id);
    this.setState({ current_contacts: c_contacts[0] });
    this.props.getContactOpportunities(id);
  }

  onDeleteCick(id, e) {
    this.props.deleteContact(id, this.props.history);
    this.setState({ current_contacts: null });
  }

  render() {
    const { loading, contacts } = this.props.contacts;

    let content;
    // Load spinner
    if (loading) {
      content = <Spinner />;
    } else {
      // Main content
      if (contacts === null) {
        content = (
          <div className="col-sm-12 float-left padding-0">
            <div className="col-sm-12 text-center text-danger" role="alert">
              <p>You have no contact</p> <br />
            </div>
          </div>
        );
      } else {
        content = (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(org => (
                <tr
                  className={classnames("test ", {
                    "alert alert-info":
                      this.state.currently_selected_id === org._id
                  })}
                  style={{ cursor: "pointer" }}
                  key={org._id}
                  onClick={this.onRowSelect.bind(this, org._id)}
                >
                  <td>{org.name}</td>
                  <td>{org.email}</td>
                  <td>{org.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
    }

    // Right side panel content
    let right_content;
    if (this.state.current_contacts === null) {
      right_content = (
        <div>
          <br />
          <p className="text-primary">
            <i className="fa fa-arrow-left" /> Please select a contact to see
            info
          </p>
          <br />
        </div>
      );
    } else {
      const contacts = this.state.current_contacts;
      const { contactOpportunities } = this.props.opportunities;
      right_content = (
        <div>
          <h4 className="card-title">{contacts.name}</h4>
          <h6 className="card-subtitle mb-2 text-muted">{contacts.email}</h6>

          <hr />
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Title</span>
            </div>
            <div className="col-sm-9 padding-0">{contacts.title}</div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Phone</span>
            </div>
            <div className="col-sm-9 padding-0">{contacts.phone}</div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Website</span>
            </div>
            <div className="col-sm-9 padding-0">{contacts.website}</div>
          </div>

          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Department</span>
            </div>
            <div className="col-sm-9 padding-0">{contacts.department}</div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Organization</span>
            </div>
            <div className="col-sm-9 padding-0">
              {contacts.organization.name}
            </div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Primary Address</span>
            </div>
            <div className="col-sm-9 padding-0">{contacts.primaryAddress}</div>
          </div>

          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Secondary Address</span>
            </div>
            <div className="col-sm-9 padding-0">
              {contacts.secondaryAddress}
            </div>
          </div>

          <div className="col-sm-12 text-center">
            <Link
              className="btn btn-info btn-sm"
              to={`/edit-contacts/${contacts._id}`}
            >
              Edit
            </Link>

            <button
              onClick={this.onDeleteCick.bind(this, contacts._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
          <hr />
          <h4 className="card-title text-info">OPPORTUNITIES</h4>
          {contactOpportunities === null ? (
            <h4 className="text-primary">This contact has no oppertunities</h4>
          ) : (
            <div>
              <table className="table" style={{ fontSize: 11 }}>
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Probability</th>
                    <th scope="col">Start</th>
                    <th scope="col">Close</th>
                  </tr>
                </thead>
                <tbody>
                  {contactOpportunities.map(oppr => (
                    <tr key={oppr._id}>
                      <td>{oppr.title}</td>
                      <td>{oppr.amount}</td>
                      <td>{oppr.probability} %</td>
                      <td>{dateFormate(oppr.startDate)}</td>
                      <td>{dateFormate(oppr.closeDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }
    return (
      <div>
        <div className="col-sm-12 row margin-0">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-info pull-left">CONTACTS</h4>
                <h4 className="card-title text-info pull-right">
                  <Link
                    className="btn btn-info btn-sm margin-0"
                    to="/add-contacts"
                  >
                    Add Contact
                  </Link>
                </h4>
                <br />
                {content}
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-info">CONTACT INFO</h4>
                {right_content}
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
  { getContacts, getContactOpportunities, deleteContact }
)(withRouter(Contact));
