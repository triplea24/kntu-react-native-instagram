import {
  AUTH_CHANGE_FIELD,
  AUTH_CHANGE_STATUS,
  AUTH_LOGIN_START,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_FINISHED
} from "../actions";

const initialState = {
  username: "junkook._",
  password: "123456",
  loading: false,
  error: false,
  errorMessage: "",
  isAuthenticated: false
};
export default (auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHANGE_FIELD:
      return { ...state, [action.field]: action.payload };
    case AUTH_CHANGE_STATUS:
      return { ...state, isAuthenticated: action.payload };
    case AUTH_LOGIN_START:
      return { ...state, loading: true, error: false, errorMessage: "" };
    case AUTH_LOGIN_ERROR:
      return { ...state, error: true, errorMessage: action.payload };
    case AUTH_LOGIN_FINISHED:
      return { ...state, loading: false };
  }
  return state;
});
