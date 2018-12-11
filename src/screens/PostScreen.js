import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  BackHandler,
  Platform,
  TouchableOpacity
} from "react-native";
import { fetchPost } from "../logics";
import { Ionicons } from "@expo/vector-icons/";

import withLoading from "../HOC/withLoading";

const LoadingView = withLoading(View);

export default class PostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Post"
  });
  state = {
    loading: false,
    post: {}
  };
  componentDidMount() {
    console.log("PostScreen", this.props.screenProps.test);

    if (Platform.OS === "android")
      BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    const { id } = this.props.navigation.state.params;
    this.setState({ post: this.props.screenProps.photos[id - 1] });
    // this.setState({ loading: true });
    // fetchPost(id)
    //   .then(post => this.setState({ post, loading: false }))
    //   .catch(() => this.setState({ loading: false }));
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
      <LoadingView loading={this.state.loading} style={styles.container}>
        <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={{ uri: this.state.post.image }}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.screenProps.toggleLike(this.state.post.id - 1);
          }}
        >
          <Ionicons
            name={this.state.post.liked ? "ios-heart" : "ios-heart-empty"}
            size={24}
            color={this.state.post.liked ? "red" : "black"}
          />
        </TouchableOpacity>
      </LoadingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
