// resource https://github.com/expo/expo/blob/master/home/utils/onlyIfAuthenticated.js
import React from "react";
import { connect } from "react-redux";

const Authenticated = connect(state => ({
  isAuthenticated: state.auth.isAuthenticated
}))(
  class AuthenticatedComponent extends React.PureComponent {
    render() {
      return this.props.isAuthenticated ? this.props.children : null;
    }
  }
);
export default (onlyIfAuthenticated = TargetComponent => {
  class OnlyIfAuthenticated extends React.Component {
    render() {
      return (
        <Authenticated>
          <TargetComponent {...this.props} />
        </Authenticated>
      );
    }
  }

  return OnlyIfAuthenticated;
});
