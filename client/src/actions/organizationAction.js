import axios from "axios";
import { GET_ORGANIZATIONS, GET_ERRORS } from "./types";

// Get organizations
export const getOrganizations = () => dispatch => {
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
