import { fetchUsers } from "../logics";

export const AUTH_CHANGE_FIELD = "AUTH_CHANGE_FIELD";
export const AUTH_CHANGE_STATUS = "AUTH_CHANGE_STATUS";
export const AUTH_LOGIN_START = "AUTH_LOGIN_START";
export const AUTH_LOGIN_ERROR = "AUTH_LOGIN_ERROR";
export const AUTH_LOGIN_FINISHED = "AUTH_LOGIN_FINISHED";

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

export const loginUser = (username, password) => dispatch => {
  dispatch({
    type: AUTH_LOGIN_START
  });
  fetchUsers(username)
    .then(user => {
      const isValid = password === user.password;
      if (isValid) {
        // this.props.changeAuthStatus(true);
        dispatch({
          type: AUTH_CHANGE_STATUS,
          payload: true
        });
        // this.props.loginUser(user);
        dispatch({
          type: USER_LOGGED_IN,
          payload: user
        });
        // this.props.navigation.navigate("App");
      }
    })
    .catch(e =>
      dispatch({
        type: AUTH_LOGIN_ERROR,
        payload: e.message
      })
    )
    .then(() =>
      dispatch({
        type: AUTH_LOGIN_FINISHED
      })
    );
};
