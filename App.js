import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import FeedScreen from "./src/screens/FeedScreen";
import PostScreen from "./src/screens/PostScreen";
import UserScreen from "./src/screens/UserScreen";

const FeedNavigator = createStackNavigator({
  feed: { screen: FeedScreen },
  post: { screen: PostScreen },
  user: { screen: UserScreen }
});

const AppNavigator = createBottomTabNavigator(
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

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  state = {
    photos: []
  };
  updatePhotos = photos => {
    this.setState({ photos });
  };
  toggleLike = index => {
    const { photos } = this.state;
    const { liked } = photos[index];
    photos[index].liked = !liked;
    this.setState({ photos });
  };
  render() {
    const value = {
      photos: this.state.photos,
      updatePhotos: this.updatePhotos,
      toggleLike: this.toggleLike
    };
    console.log("this.state", this.state);
    return <AppContainer screenProps={value} />;
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
