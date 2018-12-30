import React from "react";
import { View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import Profile from "../components/Profile";
import { fetchPhotos } from "../logics";
import { makeCancelable } from "../utils";

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
        this.setState({ isOwnProfile, posts, loaded: true, user_avatar })
      )
      .catch(error => console.log(error.message));
  }
  componentWillUnmount() {
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
