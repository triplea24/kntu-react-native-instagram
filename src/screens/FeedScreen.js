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
    data: [
      { username: "1", liked: false },
      { username: "2", liked: false },
      { username: "3", liked: false },
      { username: "4", liked: false },
      { username: "5", liked: false }
    ]
  };
  render() {
    const imageWidth = Dimensions.get("window").width;
    const images = this.state.data.map(({ username, liked }, index) => {
      return (
        <View key={index + ""}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("post", {
                username,
                liked,
                uri: "https://placekitten.com/g/200/300"
              })
            }
            style={styles.titleContainer}
          >
            <Image
              style={styles.userAvatar}
              source={{ uri: "https://placekitten.com/g/200/300" }}
            />
            <Text style={styles.title}>{username}</Text>
            <TouchableOpacity>
              <Ionicons name="ios-more" size={24} />
            </TouchableOpacity>
          </TouchableOpacity>
          <Image
            style={{ width: imageWidth, height: imageWidth }}
            source={{ uri: "https://placekitten.com/g/200/300" }}
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
        </View>
      );
    });
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
  userAvatar: { width: 64, height: 64, borderRadius: 32 },
  title: { marginLeft: 10, flex: 1 },
  likeContainer: { margin: 5, flexDirection: "row" }
});
