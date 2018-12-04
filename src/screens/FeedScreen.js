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

import { fetchPhotos } from "../logics";
import { FlatList } from "react-native-gesture-handler";

export default class FeedScreen extends Component {
  static navigationOptions = {
    headerTitle: "Home"
  };
  state = {
    data: []
  };
  componentDidMount() {
    fetchPhotos()
      .then(data => {
        this.setState({ data });
      })
      .catch(({ message }) => console.log(message));
  }
  renderItem = ({ item, index }) => {
    const { id, username, user_avatar, image, caption, liked } = item;
    const imageWidth = Dimensions.get("window").width;

    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("post", { id })}
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
  };
  render = () => {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        style={styles.container}
        keyExtractor={({ id }, index) => id + ""}
      />
    );
  };
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
