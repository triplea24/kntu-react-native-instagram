import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Provider } from "react-redux";

import { LoginScreen, FeedScreen, PostScreen, UserScreen } from "@screens";
import { AppProvider } from "@context/AppContext";
import store from "./src/store";

const FeedNavigator = createStackNavigator({
  feed: { screen: FeedScreen },
  post: { screen: PostScreen },
  user: { screen: UserScreen }
});

const HomeNavigator = createBottomTabNavigator(
  {
    Feed: FeedNavigator,
    User: { screen: UserScreen }
  },
  {
    initialRouteName: "User",
    initialRouteParams: {
      username: "junkook._",
      user_avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
    }
  }
);

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  App: HomeNavigator
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </AppProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
