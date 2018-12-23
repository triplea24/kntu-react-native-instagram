import { AUTH_CHANGE_FIELD } from "../actions";

const initialState = { username: "", password: "" };
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHANGE_FIELD:
      return { ...state, [action.field]: action.payload };
  }
  return state;
};
