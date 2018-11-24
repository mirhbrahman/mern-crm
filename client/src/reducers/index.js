import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import organizationReducer from "./organizationReducer";
import leadReducer from "./leadReducer";
import contactReducer from "./contactReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  orgs: organizationReducer,
  leads: leadReducer,
  contacts: contactReducer,
  errors: errorReducer
});
