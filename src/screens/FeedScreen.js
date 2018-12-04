import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons/";

export default class FeedScreen extends Component {
  static navigationOptions = {
    headerTitle: "Home"
  };
  state = {
    data: []
  };
  componentDidMount() {
    // fetch()
    fetch("http://localhost:3000/photos")
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      })
      .catch(({ message }) => console.log(message));
  }
  render() {
    const imageWidth = Dimensions.get("window").width;
    const images = this.state.data.map(
      ({ username, user_avatar, image, caption, liked }, index) => {
        return (
          <View key={index + ""}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("post", {
                  username,
                  liked,
                  uri: image
                })
              }
              style={styles.titleContainer}
            >
              <Image style={styles.userAvatar} source={{ uri: user_avatar }} />
              <Text style={styles.title}>{username}</Text>
              <TouchableOpacity>
                <Ionicons name="ios-more" size={24} />
              </TouchableOpacity>
            </TouchableOpacity>
            <Image
              style={{ width: imageWidth, height: imageWidth }}
              source={{ uri: image }}
            />
            <View style={styles.likeContainer}>
              <TouchableOpacity
                onPress={() => {
                  // const data = this.state.data;
                  const { data } = this.state;
                  data[index].liked = !liked;
                  // this.setState({ data: data });
                  this.setState({ data });
                }}
              >
                <Ionicons
                  name={liked ? "ios-heart" : "ios-heart-empty"}
                  size={24}
                  color={liked ? "red" : "black"}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        );
      }
    );
    return <ScrollView style={styles.container}>{images}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 20
  },
  caption: { margin: 20 },
  userAvatar: { width: 64, height: 64, borderRadius: 32 },
  title: { marginLeft: 10, flex: 1 },
  likeContainer: { margin: 5, flexDirection: "row" }
});
