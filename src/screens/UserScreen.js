import React from "react";
import { View, StyleSheet, FlatList, Dimensions, Image } from "react-native";

import ProfileImage from "../components/ProfileImage";
import { fetchPhotos } from "../logics";

export default class UserScreen extends React.Component {
  state = {
    posts: []
  };
  componentDidMount() {
    const { username, user_avatar } = this.props.navigation.state.params;
    fetchPhotos(username).then(posts => this.setState({ posts }));
    this.setState({ user_avatar });
    console.log("UserScreen", this.props.screenProps.test);
  }
  renderItem = ({ item, index }) => {
    const { id, image, caption, liked } = item;
    const imageWidth = Dimensions.get("window").width / 3;
    return (
      <Image
        style={{ width: imageWidth, height: imageWidth }}
        source={{ uri: image }}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ProfileImage
          style={styles.userAvatar}
          source={{ uri: this.state.user_avatar }}
        />
        <FlatList
          data={this.state.posts}
          renderItem={this.renderItem}
          numColumns={3}
          keyExtractor={({ id }, index) => id + ""}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userAvatar: { margin: 20 }
});
