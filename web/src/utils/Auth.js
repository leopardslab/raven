import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const setLocalStoage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStoageItem = (key) => {
  return localStorage.getItem(key);
};

export const isAuthenticated = () => {};

export const GetTokenAuthUrl = (code, state) => {
  let type = getLocalStoageItem("provider");
  axios
    .get(
      `${SERVER_URL}/oauth/redirect?code=${code}&type=${type}&state=${state}`
    )
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
