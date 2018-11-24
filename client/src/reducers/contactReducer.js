import {
  CONTACT_LOADING,
  GET_CONTACTS,
  GET_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT
} from "../actions/types";

const initialState = {
  contacts: null,
  contact: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTACT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case GET_CONTACT:
      return {
        ...state,
        contact: action.payload
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id
            ? (contact = action.payload)
            : contact
        ),
        contact: null
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload._id
        )
      };

    default:
      return state;
  }
}
