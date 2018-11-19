import React, { Component } from "react";
import { Link } from "react-router-dom";

class ViewLead extends Component {
  render() {
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
                    to="/add-leads"
                  >
                    Add Leads
                  </Link>
                </h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>Otto</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>Thornton</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-info">LEADS INFO</h4>I think
                that’s a responsibility that I have, to push possibilities, to
                show people, this is the level that things could be at. So when
                you get something that has the name Kanye West on it, it’s
                supposed to be pushing the furthest possibilities. I will be the
                leader of a company that ends up being worth billions of
                dollars, because I got the answers. I understand culture. I am
                the nucleus.
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

export default ViewLead;
