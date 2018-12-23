import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import FeedScreen from "./src/screens/FeedScreen";
import PostScreen from "./src/screens/PostScreen";
import UserScreen from "./src/screens/UserScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { AppProvider } from "./src/context/AppContext";

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

const auth = (state = { username: "", password: "" }, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return { ...state, [action.field]: action.payload };
  }
  return state;
};

export const store = createStore(combineReducers({ auth }));

store.subscribe(() => console.log("store", store.getState()));
// store.dispatch({ type: "INCREMENT1", payload: 5 });

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
