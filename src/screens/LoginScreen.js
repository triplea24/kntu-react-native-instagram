import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator
} from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";

import { changeField, changeAuthStatus, loginUser } from "../actions";
import { fetchUsers } from "../logics";

class LoginScreen extends React.Component {
  handleSubmit = () => {
    const { username, password } = this.props;
    this.props.loginUser(username, password);
  };
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate("App");
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate("App");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>LoginScreen</Text>
        {this.props.loading ? (
          <ActivityIndicator />
        ) : (
          <React.Fragment>
            <Text>Username: </Text>
            <TextInput
              style={{ margin: 5, backgroundColor: "#cccccc" }}
              value={this.props.username}
              onChangeText={username =>
                this.props.changeField("username", username)
              }
            />
            <Text>Password: </Text>
            <TextInput
              style={{ margin: 5, backgroundColor: "#cccccc" }}
              value={this.props.password}
              onChangeText={password =>
                this.props.changeField("password", password)
              }
            />
            {this.props.error && <Text>{this.props.errorMessage}</Text>}
            <Button
              title={"Submit"}
              onPress={this.handleSubmit}
              style={{ marginTop: 10 }}
            />
          </React.Fragment>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  password: state.auth.password,
  username: state.auth.username,
  loading: state.auth.loading,
  error: state.auth.error,
  errorMessage: state.auth.errorMessage,
  isAuthenticated: state.auth.isAuthenticated
});

// const mapDispatchToProps = dispatch => ({
//   changeAuthStatus: () => dispatch(changeAuthStatus(true))
// });

export default connect(
  mapStateToProps,
  { changeField, changeAuthStatus, loginUser }
)(LoginScreen);

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: Constants.statusBarHeight }
});
