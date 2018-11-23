import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import Spinner from "../common/Spinner";
import { getLeads, deleteLead } from "../../actions/leadActions";

class Lead extends Component {
  state = {
    currently_selected_id: null,
    current_leads: null
  };
  componentDidMount() {
    this.props.getLeads();
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ leads: nextProps.leads });
  }

  onRowSelect(id, e) {
    this.setState({ currently_selected_id: id });
    const { leads } = this.props.leads;
    const c_leads = leads.filter(org => org._id === id);
    this.setState({ current_leads: c_leads[0] });
  }

  onDeleteCick(id, e) {
    this.props.deleteLead(id, this.props.history);
    this.setState({ current_leads: null });
  }

  render() {
    const { loading, leads } = this.props.leads;

    let content;
    // Load spinner
    if (loading) {
      content = <Spinner />;
    } else {
      // Main content
      if (leads === null) {
        content = (
          <div className="col-sm-12 float-left padding-0">
            <div className="col-sm-12 text-center text-danger" role="alert">
              <p>You have no Lead</p> <br />
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
              {leads.map(org => (
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
    if (this.state.current_leads === null) {
      right_content = (
        <div>
          <br />
          <p className="text-primary">
            <i className="fa fa-arrow-left" /> Please select a Lead to see info
          </p>
          <br />
        </div>
      );
    } else {
      const leads = this.state.current_leads;
      right_content = (
        <div>
          <h4 className="card-title">{leads.name}</h4>
          <h6 className="card-subtitle mb-2 text-muted">{leads.email}</h6>

          <hr />
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Title</span>
            </div>
            <div className="col-sm-9 padding-0">{leads.title}</div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Phone</span>
            </div>
            <div className="col-sm-9 padding-0">{leads.phone}</div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Website</span>
            </div>
            <div className="col-sm-9 padding-0">{leads.website}</div>
          </div>

          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Department</span>
            </div>
            <div className="col-sm-9 padding-0">{leads.department}</div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Organization</span>
            </div>
            <div className="col-sm-9 padding-0">{leads.organization.name}</div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Primary Address</span>
            </div>
            <div className="col-sm-9 padding-0">{leads.primaryAddress}</div>
          </div>

          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Secondary Address</span>
            </div>
            <div className="col-sm-9 padding-0">{leads.secondaryAddress}</div>
          </div>

          <div className="col-sm-12 text-center">
            <Link
              className="btn btn-info btn-sm"
              to={`/edit-leads/${leads._id}`}
            >
              Edit
            </Link>

            <button
              onClick={this.onDeleteCick.bind(this, leads._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="col-sm-12 row margin-0">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-info pull-left">LEADS</h4>
                <h4 className="card-title text-info pull-right">
                  <Link
                    className="btn btn-info btn-sm margin-0"
                    to="/add-Leads"
                  >
                    Add Lead
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
                <h4 className="card-title text-info">LEAD INFO</h4>
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
  leads: state.leads,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getLeads, deleteLead }
)(withRouter(Lead));
