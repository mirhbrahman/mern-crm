import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { dateFormate } from "../../utils/dateFormate";
import Spinner from "../common/Spinner";
import {
  getOpportunities,
  deleteOpportunity
} from "../../actions/opportunityActions";

class Opportunity extends Component {
  state = {
    currently_selected_id: null,
    current_opportunities: null
  };
  componentDidMount() {
    this.props.getOpportunities();
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ opportunities: nextProps.opportunities });
  }

  onRowSelect(id, e) {
    this.setState({ currently_selected_id: id });
    const { opportunities } = this.props.opportunities;
    const c_opportunities = opportunities.filter(oppr => oppr._id === id);
    this.setState({ current_opportunities: c_opportunities[0] });
  }

  onDeleteCick(id, e) {
    this.props.deleteOpportunity(id, this.props.history);
    this.setState({ current_opportunities: null });
  }

  render() {
    const { loading, opportunities } = this.props.opportunities;

    let content;
    // Load spinner
    if (loading) {
      content = <Spinner />;
    } else {
      // Main content
      if (opportunities === null) {
        content = (
          <div className="col-sm-12 float-left padding-0">
            <div className="col-sm-12 text-center text-danger" role="alert">
              <p>You have no opportunity</p> <br />
            </div>
          </div>
        );
      } else {
        content = (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Contact</th>
                <th scope="col">Amount</th>
                <th scope="col">Probability</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map(oppr => (
                <tr
                  className={classnames("test ", {
                    "alert alert-info":
                      this.state.currently_selected_id === oppr._id
                  })}
                  style={{ cursor: "pointer" }}
                  key={oppr._id}
                  onClick={this.onRowSelect.bind(this, oppr._id)}
                >
                  <td>{oppr.title}</td>
                  <td>{oppr.contact.name}</td>
                  <td>{oppr.amount}</td>
                  <td>{oppr.probability} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
    }

    // Right side panel content
    let right_content;
    if (this.state.current_opportunities === null) {
      right_content = (
        <div>
          <br />
          <p className="text-primary">
            <i className="fa fa-arrow-left" /> Please select a opportunity to
            see info
          </p>
          <br />
        </div>
      );
    } else {
      const opportunities = this.state.current_opportunities;
      right_content = (
        <div>
          <h4 className="card-title">{opportunities.title}</h4>
          <h6 className="card-subtitle mb-2 text-muted">
            {opportunities.contact.name} ({opportunities.contact.email})
          </h6>

          <hr />
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Amount</span>
            </div>
            <div className="col-sm-9 padding-0">{opportunities.amount}</div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Probability</span>
            </div>
            <div className="col-sm-9 padding-0">
              {opportunities.probability} %
            </div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Start Date</span>
            </div>
            <div className="col-sm-9 padding-0">
              {dateFormate(opportunities.startDate)}
            </div>
          </div>

          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Close Date</span>
            </div>
            <div className="col-sm-9 padding-0">
              {dateFormate(opportunities.closeDate)}
            </div>
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3 padding-0">
              <span className="text-primary">Description</span>
            </div>
            <div className="col-sm-9 padding-0">
              {opportunities.description}
            </div>
          </div>

          <div className="col-sm-12 text-center">
            <Link
              className="btn btn-info btn-sm"
              to={`/edit-opportunities/${opportunities._id}`}
            >
              Edit
            </Link>

            <button
              onClick={this.onDeleteCick.bind(this, opportunities._id)}
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
                  OPPORTUNITIES
                </h4>
                <h4 className="card-title text-info pull-right">
                  <Link
                    className="btn btn-info btn-sm margin-0"
                    to="/add-opportunities"
                  >
                    Add Opportunity
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
                <h4 className="card-title text-info">OPPORTUNITY INFO</h4>
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
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getOpportunities, deleteOpportunity }
)(withRouter(Opportunity));
