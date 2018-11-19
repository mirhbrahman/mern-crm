import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import organizationReducer from "./organizationReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  orgs: organizationReducer,
  errors: errorReducer
});
