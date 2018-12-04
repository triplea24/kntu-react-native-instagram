import React from "react";
import { ActivityIndicator } from "react-native";
export default (withLoading = WrappedComponent => {
  return class LoadingComponent extends React.PureComponent {
    render() {
      const { loading, ...otherProps } = this.props;
      return (
        <React.Fragment>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <WrappedComponent {...otherProps} />
          )}
        </React.Fragment>
      );
    }
  };
});
