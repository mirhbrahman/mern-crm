import axios from "axios";
import {
  GET_ORGANIZATIONS,
  GET_ORGANIZATION,
  GET_ERRORS,
  DELETE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  ORGANIZATION_LOADING
} from "./types";

// Get organizations
export const getOrganizations = () => dispatch => {
  dispatch(setOrgLoading());

  axios
    .get("/api/organizations")
    .then(res => {
      dispatch({
        type: GET_ORGANIZATIONS,
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

export const setOrgLoading = () => {
  return {
    type: ORGANIZATION_LOADING
  };
};

// Get organization
export const getOrganization = id => dispatch => {
  axios
    .get(`/api/organizations/${id}`)
    .then(res => {
      dispatch({
        type: GET_ORGANIZATION,
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

// Add organization
export const addOrganization = (orgData, history) => dispatch => {
  axios
    .post("/api/organizations", orgData)
    .then(res => history.push("/organizations"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Update organization
export const updateOrganization = (id, orgData, history) => dispatch => {
  axios
    .put(`/api/organizations/${id}`, orgData)
    .then(res => {
      dispatch({
        type: UPDATE_ORGANIZATION,
        payload: res.data
      });
      history.push("/organizations");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete organization
export const deleteOrganization = (id, history) => dispatch => {
  axios
    .delete(`/api/organizations/${id}`, id)
    .then(res => {
      dispatch({
        type: DELETE_ORGANIZATION,
        payload: res.data
      });
      history.push("/organizations");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
