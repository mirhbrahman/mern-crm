import React, { Component } from "react";

class ProfileInfo extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <div className="col-sm-12 row margin-0">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{profile.name}</h4>
                <h6 className="card-subtitle mb-2 text-muted">
                  {profile.email}
                </h6>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="content text-center">
                  <div className="content-count">
                    <h2 className="btn btn-info btn-round">26</h2>
                    <p>Leads</p>
                  </div>
                  <div className="content-count">
                    <h2 className="btn btn-primary btn-round">26</h2>
                    <p>Contacts</p>
                  </div>
                  <div className="content-count">
                    <h2 className="btn btn-success btn-round">48</h2>
                    <p>Opportunity</p>
                  </div>
                  <div className="content-count">
                    <h2 className="btn btn-danger btn-round">48</h2>
                    <p>Proposals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
