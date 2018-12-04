import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  BackHandler,
  Platform
} from "react-native";
import axios from "axios";
import { fetchPost } from "../logics";

export default class PostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Post"
  });
  state = {
    post: {}
  };
  componentDidMount() {
    if (Platform.OS === "android")
      BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    const { id } = this.props.navigation.state.params;
    fetchPost(id).then(post => this.setState({ post }));
  }
  componentWillUnmount() {
    if (Platform.OS === "android")
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackPress
      );
  }
  handleBackPress() {
    this.props.navigation.goBack();
  }
  render() {
    const imageWidth = Dimensions.get("window").width;
    return (
      <View style={styles.container}>
        <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={{ uri: this.state.post.image }}
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
