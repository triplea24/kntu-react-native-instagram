import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Button,
  Text
} from "react-native";
import i18n from "i18n-js";

import ProfileImage from "./ProfileImage";
import { fetchPhotos } from "../logics";
import { makeCancelable } from "../utils";

export default class Profile extends React.Component {
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
    console.log("this.props", this.props);
    return (
      <View style={styles.container}>
        <ProfileImage
          style={styles.userAvatar}
          source={{
            uri: this.props.user_avatar
          }}
        />
        <Text>{i18n.t("hello")}</Text>
        <Button
          title={"Change to en"}
          onPress={() => this.props.changeLocale("en")}
        />
        <Button
          title={"Change to fr"}
          onPress={() => this.props.changeLocale("fr")}
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
