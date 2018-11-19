import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { getOrganizations } from "../../actions/organizationAction";

class Organization extends Component {
  state = {
    currently_selected: null
  };
  componentDidMount() {
    this.props.getOrganizations();
  }

  onRowSelect(id, e) {
    this.setState({ currently_selected: id });
  }

  render() {
    const { orgs } = this.props.orgs;
    let content;
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
                  "alert alert-info": this.state.currently_selected === org._id
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
                <h4 className="card-title text-info">ORGANIZATION INFO</h4>I
                think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that things
                could be at. So when you get something that has the name Kanye
                West on it, it’s supposed to be pushing the furthest
                possibilities. I will be the leader of a company that ends up
                being worth billions of dollars, because I got the answers. I
                understand culture. I am the nucleus.
                <div className="col-sm-12 text-center">
                  <button className="btn btn-info btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
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
  orgs: state.orgs
});

export default connect(
  mapStateToProps,
  { getOrganizations }
)(Organization);
