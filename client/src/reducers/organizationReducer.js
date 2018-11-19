import { GET_ORGANIZATIONS } from "../actions/types";

const initialState = {
  orgs: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORGANIZATIONS:
      return {
        ...state,
        orgs: action.payload
      };

    default:
      return state;
  }
}
