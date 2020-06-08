import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_ID;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const setLocalStoage = (key, value) => {
  localStorage.setItem(key, value);
};

export const isAuthenticated = () => {};

export const GetTokenAuthUrl = (code) => {
  axios
    .get(`${SERVER_URL}/oauth/redirect?code=${code}`)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
