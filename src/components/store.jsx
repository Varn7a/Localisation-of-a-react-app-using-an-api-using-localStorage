import { createStore } from "redux";

const initialState = {
  messages: null,
  data: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
