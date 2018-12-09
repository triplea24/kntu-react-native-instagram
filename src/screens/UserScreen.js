import React from "react";
import { View, StyleSheet, FlatList, Dimensions, Image } from "react-native";

import ProfileImage from "../components/ProfileImage";
import { fetchPhotos } from "../logics";

export default class UserScreen extends React.Component {
  state = {
    posts: []
  };
  componentDidMount() {
    const { username } = this.props.navigation.state.params;
    fetchPhotos(username).then(posts => this.setState({ posts }));
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
    const { user_avatar } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <ProfileImage style={styles.userAvatar} source={{ uri: user_avatar }} />
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
