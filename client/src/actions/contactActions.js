import axios from "axios";
import {
  GET_CONTACTS,
  GET_CONTACT,
  GET_ERRORS,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  CONTACT_LOADING
} from "./types";

// Get contacts
export const getContacts = () => dispatch => {
  dispatch(setOrgLoading());

  axios
    .get("/api/contacts/contacts")
    .then(res => {
      dispatch({
        type: GET_CONTACTS,
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
    type: CONTACT_LOADING
  };
};

// Get contact
export const getContact = id => dispatch => {
  axios
    .get(`/api/contacts/contacts/${id}`)
    .then(res => {
      dispatch({
        type: GET_CONTACT,
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

// Add contact
export const addContact = (contactData, history) => dispatch => {
  axios
    .post("/api/contacts", contactData)
    .then(res => history.push("/contacts"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Update contact
export const updateContact = (id, contactData, history) => dispatch => {
  axios
    .put(`/api/contacts/${id}`, contactData)
    .then(res => {
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      });
      history.push("/contacts");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete contact
export const deleteContact = (id, history) => dispatch => {
  axios
    .delete(`/api/contacts/${id}`, id)
    .then(res => {
      dispatch({
        type: DELETE_CONTACT,
        payload: res.data
      });
      history.push("/contacts");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
