import React from "react";
import { View, Image, StyleSheet, Dimensions, Button } from "react-native";

export default class PostScreen extends React.Component {
  render() {
    const imageWidth = Dimensions.get("window").width;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button onPress={() => this.props.navigate("feed")} title={"Back"} />
        </View>
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
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#cccccc",
    paddingTop: 20,
    height: 100,
    alignItems: "center"
  }
});
