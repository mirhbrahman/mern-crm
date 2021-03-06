import axios from "axios";
import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  COUNT_RECORD,
  CLEAR_CURRENT_PROFILE
} from "./types";
// Get current user profile
export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/users/current")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Count record
export const countRecord = () => dispatch => {
  axios
    .get("/api/users/count-record")
    .then(res => {
      dispatch({
        type: COUNT_RECORD,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
