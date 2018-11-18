import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  state = {
    profile: {}
  };
  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ profile: nextProps.profile.profile });
  }

  render() {
    const { loading, profile } = this.props.profile;
    let dashtitle;
    if (profile === null && loading === true) {
      dashtitle = <Spinner />;
    } else {
      dashtitle = <h1>Dashboard {this.state.profile.name}</h1>;
    }
    return <div>{dashtitle}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Dashboard);
