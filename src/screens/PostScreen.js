import React from "react";
import { View, Image, StyleSheet, Dimensions, Button } from "react-native";

export default class PostScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Post"
  };
  render() {
    const imageWidth = Dimensions.get("window").width;
    return (
      <View style={styles.container}>
        <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={{ uri: "https://placekitten.com/g/200/300" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
