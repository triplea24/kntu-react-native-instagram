import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import FeedScreen from "./src/screens/FeedScreen";
import PostScreen from "./src/screens/PostScreen";

const AppNavigator = createStackNavigator({
  feed: { screen: FeedScreen },
  post: { screen: PostScreen }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
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
