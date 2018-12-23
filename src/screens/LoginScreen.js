import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";

import { store } from "../../App";

const changeField = (field, payload) => ({
  type: "CHANGE_FIELD",
  field,
  payload
});

class LoginScreen extends React.Component {
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
