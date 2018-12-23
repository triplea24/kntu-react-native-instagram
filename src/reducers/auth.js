import { AUTH_CHANGE_FIELD, AUTH_CHANGE_STATUS } from "../actions";

const initialState = { username: "", password: "", isAuthenticated: false };
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHANGE_FIELD:
      return { ...state, [action.field]: action.payload };
    case AUTH_CHANGE_STATUS:
      return { ...state, isAuthenticated: action.payload };
  }
  return state;
};
