import axios from "axios";
import { Permissions, Notifications } from "expo";

const SERVER_ENDPOINT = "http://localhost:3000";

const cache = {};
// export const fetchPhotos = async () => {
//   if (a.photos) {
//     console.log("read from cache");
//     return a.photos;
//   }
//   return axios.get("http://localhost:3000/photos").then(({ data }) => data);
// };
export const fetchPhotos = username => {
  return new Promise((resolve, reject) => {
    // if (cache.photos) {
    //   // const diff  = new Date() - cache.timestamp;
    //   // if(diff < 50000){
    //   resolve(cache.photos);
    //   // }
    // }
    let url = `${SERVER_ENDPOINT}/photos?`;
    if (username) {
      url = url + `username=${username}`;
    }
    axios
      .get(url)
      .then(({ data }) => {
        // cache.photos = data;
        // cache.timestamp = new Date();
        return data;
      })
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
};

export const fetchPost = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${SERVER_ENDPOINT}/photos?id=${id}`)
      .then(({ data }) => resolve(data[0]))
      .catch(e => reject(e));
  });
};

export const fetchUsers = username => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${SERVER_ENDPOINT}/users?username=${username}`)
      .then(({ data }) => resolve(data[0]))
      .catch(e => reject(e));
  });
};

export const registerForPushNotifications = () => {
  return new Promise(async (resolve, reject) => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    axios
      .post(`${SERVER_ENDPOINT}/notifications`, {
        token
      })
      .then(() => resolve())
      .catch(e => reject(e));
  });
};
