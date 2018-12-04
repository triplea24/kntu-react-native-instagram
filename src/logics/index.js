import axios from "axios";

export const fetchPhotos = () => {
  return axios.get("http://localhost:3000/photos").then(({ data }) => data);
};

export const fetchPost = id => {
  return axios
    .get(`http://localhost:3000/photos?id=${id}`)
    .then(({ data }) => data[0]);
};
