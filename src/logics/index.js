import axios from "axios";

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
    let url = "http://localhost:3000/photos?";
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
      .get(`http://localhost:3000/photos?id=${id}`)
      .then(({ data }) => resolve(data[0]))
      .catch(e => reject(e));
  });
};

export const fetchUsers = username => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/users?username=${username}`)
      .then(({ data }) => resolve(data[0]))
      .catch(e => reject(e));
  });
};
