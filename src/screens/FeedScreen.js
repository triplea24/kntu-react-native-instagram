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
import { withTimeout } from "../utils";
import { connect } from "../context/AppContext";

const List = withLoading(FlatList);

export class FeedScreen extends Component {
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
    withTimeout(fetchPhotos())
      .then(data => {
        if (this.props.updatePhotos) this.props.updatePhotos(data);
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
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("user", { username, user_avatar })
            }
          >
            <ProfileImage source={{ uri: user_avatar }} />
          </TouchableOpacity>
          <Text style={styles.title}>{username}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("post", { id })}
          >
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
              this.props.toggleLike(index);
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
        data={this.props.photos}
        renderItem={this.renderItem}
        style={styles.container}
        extraData={this.props}
        keyExtractor={({ id }, index) => id + ""}
      />
    );
  };
}

const mapStateToProps = state => ({
  photos: state.photos,
  toggleLike: state.toggleLike,
  updatePhotos: state.updatePhotos
});

export default connect(mapStateToProps)(FeedScreen);

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
