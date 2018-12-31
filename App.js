import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  View,
  AsyncStorage,
  AppState
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { DangerZone, Notifications } from "expo";
let { Lottie } = DangerZone;
import { Localization } from "expo-localization";
import i18n from "i18n-js";
const en = {
  hello: "Hello"
};
const fr = {
  hello: "Bonjours"
};

i18n.fallbacks = true;
i18n.translations = { fr, en };

import reducers from "./src/reducers";

import { LoginScreen, FeedScreen, PostScreen, UserScreen } from "@screens";
import { AppProvider } from "@context/AppContext";
import { registerForPushNotifications } from "./src/logics";

const FeedNavigator = createStackNavigator({
  feed: { screen: FeedScreen },
  post: { screen: PostScreen },
  user: { screen: UserScreen }
});

const HomeNavigator = createBottomTabNavigator(
  {
    Feed: FeedNavigator,
    User: { screen: UserScreen }
  },
  {
    initialRouteName: "User"
  }
);

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  App: HomeNavigator
});

const AppContainer = createAppContainer(AppNavigator);

class SplashScreen extends Component {
  state = {
    progress: new Animated.Value(0) // Initial value for opacity: 0
  };
  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.progress, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 3000 // Make it take a while
      }
    ).start();
    registerForPushNotifications();
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Lottie
          source={require("./assets/loading.json")}
          progress={this.state.progress}
        />
      </View>
    );
  }
}

const REDUX_STORE_STORAGE_NAME = "redux-store-persist";

export default class App extends Component {
  state = {
    isLoaded: false,
    store: null,
    appState: AppState.currentState
  };
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    setTimeout(() => {
      AsyncStorage.getItem(REDUX_STORE_STORAGE_NAME, (err, result) => {
        const state = JSON.parse(result) || {};
        console.log("persisted state", state);
        const store = createStore(reducers, state, applyMiddleware(thunk));
        this.setState({ isLoaded: true, store });
        store.subscribe(() => {
          i18n.locale = store.getState().locale;
          console.log(store.getState());
        });
      });
    }, 1);
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _handleNotification = ({ data }) => {
    // console.log(notification);
    Notifications.presentLocalNotificationAsync({
      title: data.title,
      body: data.body
    });
  };
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // App is in Foreground
    } else {
      // App is in Background
      const storeState = this.state.store.getState();
      console.log("store", storeState);
      AsyncStorage.setItem(
        REDUX_STORE_STORAGE_NAME,
        JSON.stringify(storeState),
        err => {
          console.log("saved");
        }
      );
    }
    this.setState({ appState: nextAppState });
  };
  render() {
    if (!this.state.isLoaded) {
      return <SplashScreen />;
    }

    // console.log("app state", this.state.store.getState());
    return (
      <AppProvider>
        <Provider store={this.state.store}>
          <AppContainer />
        </Provider>
      </AppProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
