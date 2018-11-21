import {
  ORGANIZATION_LOADING,
  GET_ORGANIZATIONS,
  GET_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION
} from "../actions/types";

const initialState = {
  orgs: null,
  org: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORGANIZATION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ORGANIZATIONS:
      return {
        ...state,
        orgs: action.payload,
        loading: false
      };
    case GET_ORGANIZATION:
      return {
        ...state,
        org: action.payload
      };
    case UPDATE_ORGANIZATION:
      return {
        ...state,
        orgs: state.orgs.map(org =>
          org._id === action.payload._id ? (org = action.payload) : org
        ),
        org: null
      };

    case DELETE_ORGANIZATION:
      return {
        ...state,
        orgs: state.orgs.filter(org => org._id !== action.payload._id)
      };

    default:
      return state;
  }
}
