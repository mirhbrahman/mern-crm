import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile, countRecord } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileInfo from "../profile/ProfileInfo";

class Dashboard extends Component {
  state = {
    profile: {},
    countRecord: {}
  };
  componentDidMount() {
    this.props.getProfile();
    this.props.countRecord();
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ profile: nextProps.profile.profile });
    this.setState({ countRecord: nextProps.profile.countRecord });
  }

  render() {
    const { loading, profile } = this.props.profile;
    let dashContent;
    if (profile === null && loading === true) {
      dashContent = <Spinner />;
    } else {
      dashContent = (
        <ProfileInfo
          profile={this.state.profile}
          countRecord={this.state.countRecord}
        />
      );
    }
    return <div>{dashContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile, countRecord }
)(Dashboard);
