import axios from "axios";
import {
  GET_OPPORTUNITIES,
  GET_OPPORTUNITY,
  GET_ERRORS,
  DELETE_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
  OPPORTUNITY_LOADING,
  GET_CONTACT_OPPORTUNITIES
} from "./types";

// Get opportunities
export const getOpportunities = () => dispatch => {
  dispatch(setOpprLoading());

  axios
    .get("/api/opportunities")
    .then(res => {
      dispatch({
        type: GET_OPPORTUNITIES,
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

export const setOpprLoading = () => {
  return {
    type: OPPORTUNITY_LOADING
  };
};

// Get opportunity
export const getOpportunity = id => dispatch => {
  axios
    .get(`/api/opportunities/${id}`)
    .then(res => {
      dispatch({
        type: GET_OPPORTUNITY,
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

// Get opportunities
export const getContactOpportunities = id => dispatch => {
  axios
    .get(`/api/opportunities/contact/${id}`)
    .then(res => {
      dispatch({
        type: GET_CONTACT_OPPORTUNITIES,
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

// Add opportunity
export const addOpportunity = (opportunityData, history) => dispatch => {
  axios
    .post("/api/opportunities", opportunityData)
    .then(res => history.push("/opportunities"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Update opportunity
export const updateOpportunity = (id, opportunityData, history) => dispatch => {
  axios
    .put(`/api/opportunities/${id}`, opportunityData)
    .then(res => {
      dispatch({
        type: UPDATE_OPPORTUNITY,
        payload: res.data
      });
      history.push("/opportunities");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete opportunity
export const deleteOpportunity = (id, history) => dispatch => {
  axios
    .delete(`/api/opportunities/${id}`, id)
    .then(res => {
      dispatch({
        type: DELETE_OPPORTUNITY,
        payload: res.data
      });
      history.push("/opportunities");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
