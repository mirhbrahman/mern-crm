import axios from "axios";
import {
  GET_LEADS,
  GET_LEAD,
  GET_ERRORS,
  DELETE_LEAD,
  UPDATE_LEAD,
  MAKE_CONTACT,
  LEAD_LOADING
} from "./types";

// Get leads
export const getLeads = () => dispatch => {
  dispatch(setOrgLoading());

  axios
    .get("/api/contacts/leads")
    .then(res => {
      dispatch({
        type: GET_LEADS,
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
    type: LEAD_LOADING
  };
};

// Get Lead
export const getLead = id => dispatch => {
  axios
    .get(`/api/contacts/Leads/${id}`)
    .then(res => {
      dispatch({
        type: GET_LEAD,
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

// Add Lead
export const addLead = (leadData, history) => dispatch => {
  axios
    .post("/api/contacts", leadData)
    .then(res => history.push("/leads"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Update Lead
export const updateLead = (id, leadData, history) => dispatch => {
  axios
    .put(`/api/contacts/${id}`, leadData)
    .then(res => {
      dispatch({
        type: UPDATE_LEAD,
        payload: res.data
      });
      history.push("/leads");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Make Lead to contact
export const makeContact = (id, history) => dispatch => {
  axios
    .put(`/api/contacts/make-contact/${id}`)
    .then(res => {
      dispatch({
        type: MAKE_CONTACT,
        payload: res.data
      });
      history.push("/leads");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Lead
export const deleteLead = (id, history) => dispatch => {
  axios
    .delete(`/api/contacts/${id}`, id)
    .then(res => {
      dispatch({
        type: DELETE_LEAD,
        payload: res.data
      });
      history.push("/leads");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
