import { combineReducers } from "redux";

import auth from "./auth";
import user from "./user";

const locale = (state = "en", action) => {
  if (action.type === "CHANGE_LOCALE") return action.payload;
  return state;
};

export default combineReducers({ auth, user, locale });
