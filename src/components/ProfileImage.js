import React from "react";
import { Image, StyleSheet } from "react-native";

export default class ProfileImage extends React.PureComponent {
  render() {
    const { style, ...otherProps } = this.props;
    return <Image style={[styles.userAvatar, style]} {...otherProps} />;
  }
}

const styles = StyleSheet.create({
  userAvatar: { width: 64, height: 64, borderRadius: 32 }
});
