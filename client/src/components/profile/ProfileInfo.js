import React, { Component } from "react";

class ProfileInfo extends Component {
  render() {
    const { profile } = this.props;
    const { countRecord } = this.props;
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

                <hr />
                <div className="col-sm-12 row">
                  <div className="col-sm-3 padding-0">
                    <span className="text-primary">Phone</span>
                  </div>
                  <div className="col-sm-9 padding-0">{profile.phone}</div>
                </div>
                <div className="col-sm-12 row">
                  <div className="col-sm-3 padding-0">
                    <span className="text-primary">Website</span>
                  </div>
                  <div className="col-sm-9 padding-0">{profile.website}</div>
                </div>
                <div className="col-sm-12 row">
                  <div className="col-sm-3 padding-0">
                    <span className="text-primary">Primary Address</span>
                  </div>
                  <div className="col-sm-9 padding-0">
                    {profile.primaryAddress}
                  </div>
                </div>

                <div className="col-sm-12 row">
                  <div className="col-sm-3 padding-0">
                    <span className="text-primary">Secondary Address</span>
                  </div>
                  <div className="col-sm-9 padding-0">
                    {profile.secondaryAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">OVERVIEW</h4>
                <h6 className="card-subtitle mb-2 text-muted">Record</h6>
                <hr />
                <div className="content text-center col-sm-8 mx-auto">
                  <div className="content-count">
                    <h2 className="btn btn-info btn-round">
                      {countRecord.lead}
                    </h2>
                    <p>Leads</p>
                  </div>
                  <div className="content-count">
                    <h2 className="btn btn-primary btn-round">
                      {countRecord.contact}
                    </h2>
                    <p>Contacts</p>
                  </div>
                  <div className="content-count">
                    <h2 className="btn btn-success btn-round">
                      {countRecord.opportunity}
                    </h2>
                    <p>Opportunity</p>
                  </div>
                  {/* <div className="content-count">
                    <h2 className="btn btn-danger btn-round">48</h2>
                    <p>Proposals</p>
                  </div> */}
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
