export const AUTH_CHANGE_FIELD = "AUTH_CHANGE_FIELD";
export const changeField = (field, payload) => ({
  type: AUTH_CHANGE_FIELD,
  field,
  payload
});
