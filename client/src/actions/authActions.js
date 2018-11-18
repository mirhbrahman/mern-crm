import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      // Clear errors
      dispatch({
        type: CLEAR_ERRORS
      });
      history.push("/login");
    })
    .catch(err => {
      // Check for errors
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login user
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Get token
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem("jwtToken", token);
      // Set token to axios header
      setAuthToken(token);
      // Decode to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout user
export const logoutUser = () => dispatch => {
  // Remove local storage
  localStorage.removeItem("jwtToken");
  // Remove header
  setAuthToken();
  // Clear current user
  dispatch(setCurrentUser({}));
};
