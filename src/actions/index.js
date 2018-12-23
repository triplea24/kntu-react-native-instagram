export const AUTH_CHANGE_FIELD = "AUTH_CHANGE_FIELD";
export const AUTH_CHANGE_STATUS = "AUTH_CHANGE_STATUS";
export const changeField = (field, payload) => ({
  type: AUTH_CHANGE_FIELD,
  field,
  payload
});

export const changeAuthStatus = status => ({
  type: AUTH_CHANGE_STATUS,
  payload: status
});
