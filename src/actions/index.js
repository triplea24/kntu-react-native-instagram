export const AUTH_CHANGE_FIELD = "AUTH_CHANGE_FIELD";
export const AUTH_CHANGE_STATUS = "AUTH_CHANGE_STATUS";

export const changeField = (field, payload) => dispatch => {
  dispatch({
    type: AUTH_CHANGE_FIELD,
    field,
    payload
  });
};

export const changeAuthStatus = status => dispatch => {
  dispatch({
    type: AUTH_CHANGE_STATUS,
    payload: status
  });
};

export const USER_LOGGED_IN = "USER_LOGGED_IN";

export const loginUser = user => dispatch => {
  dispatch({
    type: USER_LOGGED_IN,
    payload: user
  });
};
