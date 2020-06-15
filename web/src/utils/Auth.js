import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const setLocalStoage = (key, value) => {
  localStorage.setItem(key, value);
};

export const isAuthenticated = () => {};

export const GetTokenAuthUrl = (code, type) => {
  axios
    .get(`${SERVER_URL}/oauth/redirect?code=${code}?type=${type}`)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
