import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons/";

import { fetchPhotos } from "../logics";
import withLoading from "../HOC/withLoading";
import ProfileImage from "../components/ProfileImage";

const List = withLoading(FlatList);

export default class FeedScreen extends Component {
  static navigationOptions = {
    headerTitle: "Home"
  };
  state = {
    loading: false,
    refresh: false,
    data: []
  };
  componentDidMount() {
    this.fetchData("loading");
  }
  fetchData = key => {
    this.setState({ [key]: true });
    fetchPhotos()
      .then(data => {
        this.setState({ data });
      })
      .catch(e => console.log(e.message))
      .then(() => this.setState({ [key]: false }));
  };
  refresh = () => {
    this.setState({ refresh: true });
    setTimeout(() => {
      this.fetchData("refresh");
    }, 5000);
  };
  renderItem = ({ item, index }) => {
    const { id, username, user_avatar, image, caption, liked } = item;
    const imageWidth = Dimensions.get("window").width;

    return (
      <View>
        <View
          // onPress={() => this.props.navigation.navigate("post", { id })}
          style={styles.titleContainer}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("user", { username, user_avatar })
            }
          >
            <ProfileImage source={{ uri: user_avatar }} />
          </TouchableOpacity>
          <Text style={styles.title}>{username}</Text>
          <TouchableOpacity>
            <Ionicons name="ios-more" size={24} />
          </TouchableOpacity>
        </View>
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
      <List
        loading={this.state.loading}
        onRefresh={this.refresh}
        refreshing={this.state.refresh}
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
