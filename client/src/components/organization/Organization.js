import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import Spinner from "../common/Spinner";
import {
  getOrganizations,
  deleteOrganization
} from "../../actions/organizationAction";

class Organization extends Component {
  state = {
    currently_selected_id: null,
    current_orgs: null
  };
  componentDidMount() {
    this.props.getOrganizations();
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ orgs: nextProps.orgs });
  }

  onRowSelect(id, e) {
    this.setState({ currently_selected_id: id });
    const { orgs } = this.props.orgs;
    const c_orgs = orgs.filter(org => org._id === id);
    this.setState({ current_orgs: c_orgs[0] });
  }

  onDeleteCick(id, e) {
    this.props.deleteOrganization(id, this.props.history);
    this.setState({ current_orgs: null });
  }

  render() {
    const { loading, orgs } = this.props.orgs;

    let content;
    // Load spinner
    if (loading) {
      content = <Spinner />;
    } else {
      // Main content
      if (orgs === null) {
        content = (
          <div className="col-sm-12 float-left padding-0">
            <div className="col-sm-12 text-center text-danger" role="alert">
              <p>You have no organization</p> <br />
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
              {orgs.map(org => (
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
    if (this.state.current_orgs === null) {
      right_content = (
        <div>
          <br />
          <p className="text-primary">
            <i className="fa fa-arrow-left" /> Please select a organization to
            see info
          </p>
          <br />
        </div>
      );
    } else {
      const orgs = this.state.current_orgs;
      right_content = (
        <div>
          <h4 className="card-title">{orgs.name}</h4>
          <h6 className="card-subtitle mb-2 text-muted">{orgs.email}</h6>

          <hr />
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Phone</span>
            </div>
            <div className="col-sm-9 padding-0">{orgs.phone}</div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Website</span>
            </div>
            <div className="col-sm-9 padding-0">{orgs.website}</div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Primary Address</span>
            </div>
            <div className="col-sm-9 padding-0">{orgs.primaryAddress}</div>
          </div>

          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Secondary Address</span>
            </div>
            <div className="col-sm-9 padding-0">{orgs.secondaryAddress}</div>
          </div>

          <div className="col-sm-12 text-center">
            <Link
              className="btn btn-info btn-sm"
              to={`/edit-organizations/${orgs._id}`}
            >
              Edit
            </Link>

            <button
              onClick={this.onDeleteCick.bind(this, orgs._id)}
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
                <h4 className="card-title text-info pull-left">
                  ORGANIZATIONS
                </h4>
                <h4 className="card-title text-info pull-right">
                  <Link
                    className="btn btn-info btn-sm margin-0"
                    to="/add-organizations"
                  >
                    Add Organizations
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
                <h4 className="card-title text-info">ORGANIZATION INFO</h4>
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
  orgs: state.orgs,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getOrganizations, deleteOrganization }
)(withRouter(Organization));
