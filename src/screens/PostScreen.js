import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  BackHandler,
  Platform
} from "react-native";

export default class PostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.username
  });
  componentDidMount() {
    if (Platform.OS === "android")
      BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    if (Platform.OS === "android")
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackPress
      );
  }
  handleBackPress() {
    this.props.navigation.goBack();
  }
  render() {
    const imageWidth = Dimensions.get("window").width;
    const { uri } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={{ uri }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
