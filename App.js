import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import FeedScreen from "./src/screens/FeedScreen";
import PostScreen from "./src/screens/PostScreen";

export default class App extends Component {
  state = {
    route: "feed"
  };
  render() {
    if (this.state.route === "feed")
      return <FeedScreen navigate={route => this.setState({ route })} />;
    if (this.state.route === "post")
      return <PostScreen navigate={route => this.setState({ route })} />;
    return <View />;
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
