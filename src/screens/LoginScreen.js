import React from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";

import store from "../store";
import { changeField, changeAuthStatus, loginUser } from "../actions";
import { fetchUsers } from "../logics";

class LoginScreen extends React.Component {
  handleSubmit = () => {
    const { username, password } = this.props;
    fetchUsers(username)
      .then(user => {
        const isValid = password === user.password;
        if (isValid) {
          store.dispatch(changeAuthStatus(true));
          store.dispatch(loginUser(user));
          this.props.navigation.navigate("App");
        }
      })
      .catch(e => console.log(e.message));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>LoginScreen</Text>
        <Text>Username: </Text>
        <TextInput
          style={{ margin: 5, backgroundColor: "#cccccc" }}
          value={this.props.username}
          onChangeText={username =>
            store.dispatch(changeField("username", username))
          }
        />
        <Text>Password: </Text>
        <TextInput
          style={{ margin: 5, backgroundColor: "#cccccc" }}
          value={this.props.password}
          onChangeText={password =>
            store.dispatch(changeField("password", password))
          }
        />
        <Button
          title={"Submit"}
          onPress={this.handleSubmit}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  password: state.auth.password,
  username: state.auth.username
});

export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: Constants.statusBarHeight }
});
