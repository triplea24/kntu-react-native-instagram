import { USER_LOGGED_IN } from "../actions";

const initialState = {};

export default (userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      //   return { ...state, ...action.payload };
      return action.payload;
  }
  return state;
});
