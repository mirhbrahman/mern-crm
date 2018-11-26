import {
  LEAD_LOADING,
  GET_LEADS,
  GET_LEAD,
  UPDATE_LEAD,
  DELETE_LEAD,
  MAKE_CONTACT
} from "../actions/types";

const initialState = {
  leads: null,
  lead: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LEAD_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
        loading: false
      };
    case GET_LEAD:
      return {
        ...state,
        lead: action.payload
      };
    case UPDATE_LEAD:
      return {
        ...state,
        leads: state.leads.map(lead =>
          lead._id === action.payload._id ? (lead = action.payload) : lead
        ),
        lead: null
      };

    case MAKE_CONTACT:
      return {
        ...state,
        leads: state.leads.filter(lead => lead._id !== action.payload._id)
      };

    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter(lead => lead._id !== action.payload._id)
      };

    default:
      return state;
  }
}
