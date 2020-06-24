import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const setLocalStoage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStoageItem = (key) => {
  return localStorage.getItem(key);
};

export const GetTokenAuthUrl = (code, state) => {
  let type = getLocalStoageItem("provider");
  axios
    .get(
      `${SERVER_URL}/oauth/redirect?code=${code}&type=${type}&state=${state}`
    )
    .then(({ data }) => {
      setLocalStoage("hub", data.token);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const Authenticate = ({ data }) => {
  localStorage.setItem("raven", data.token);
};

export const LogIn = (cb) => {
  if (this.isAuthenticated()) {
    cb();
  }
};

export const LogOut = (cb) => {
  localStorage.clear();
  cb();
};

export const isAuthenticated = () => {
  //return localStorage.hasOwnProperty("raven");
  return true;
};

export const AuthToken = () => {
  return localStorage.getItem("raven");
};

export const getUserId = () => {
  return localStorage.getItem("raven");
};
