import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  AsyncStorage,
  Button
} from "react-native";
import { connect } from "react-redux";

import ProfileImage from "../components/ProfileImage";
import { fetchPhotos } from "../logics";
import { makeCancelable } from "../utils";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: props.photos ? props.photos : null
    };
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
  componentDidMount() {
    if (this.state.posts) return;
    const { username } = this.props;
    this.task = makeCancelable(fetchPhotos(username));
    this.task.promise
      .then(posts => this.setState({ posts }))
      .catch(error => console.log(error.message));
  }
  componentWillUnmount() {
    this.task && this.task.cancel();
  }
  render() {
    return (
      <View style={styles.container}>
        <ProfileImage
          style={styles.userAvatar}
          source={{
            uri: this.props.user_avatar
          }}
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

// const MyProfile = connect(mapStateToProps)(Profile);

export class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwnProfile: !props.navigation.getParam("username") ? true : null
    };
  }
  isMounted = false;
  componentDidMount() {
    if (this.state.isOwnProfile !== null) {
      return;
    }
    // this.isMounted = true;
    // const
    let username, user_avatar, isOwnProfile;
    if (this.state.isOwnProfile) {
      username = this.props.username;
      user_avatar = this.props.userAvatar;
      isOwnProfile = true;
    } else {
      username = this.props.navigation.getParam("username");
      user_avatar = this.props.navigation.getParam("user_avatar");
      isOwnProfile = false;
    }
    this.task = makeCancelable(fetchPhotos(username));
    this.task.promise
      .then(posts =>
        // this.isMounted &&
        this.setState({ isOwnProfile, posts, loaded: true, user_avatar })
      )
      .catch(error => console.log(error.message));
  }
  componentWillUnmount() {
    // this.isMounted = false;
    this.task && this.task.cancel();
  }

  render() {
    if (this.state.isOwnProfile === null) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    if (this.state.isOwnProfile) {
      return <Profile {...this.props} posts={this.state.posts} />;
    }
    const username = this.props.navigation.getParam("username");
    const user_avatar = this.props.navigation.getParam("user_avatar");
    return (
      <Profile
        username={username}
        user_avatar={user_avatar}
        posts={this.state.posts}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  user_avatar: state.user.user_avatar
});

export default connect(mapStateToProps)(UserScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userAvatar: { margin: 20 }
});
