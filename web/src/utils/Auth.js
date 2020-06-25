import axios from "axios";
import _ from "lodash";
import jwt_decode from "jwt-decode";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const setLocalStoage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStoageItem = (key) => {
  return localStorage.getItem(key);
};

export const GetTokenAuthUrl = (code, state, callback) => {
  let type = getLocalStoageItem("provider");
  axios
    .get(
      `${SERVER_URL}/oauth/redirect?code=${code}&type=${type}&state=${state}`
    )
    .then(({ data }) => {
      setLocalStoage("raven", data.token);
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
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
  return (
    !_.isUndefined(localStorage.getItem("raven")) &&
    !_.isNull(localStorage.getItem("raven"))
  );
};

export const AuthToken = () => {
  return localStorage.getItem("raven");
};

export const getUserId = () => {
  return localStorage.getItem("raven");
};

export const getUserInfo = () => {
  try {
    return !_.isUndefined(localStorage.getItem("raven"))
      ? jwt_decode(localStorage.getItem("raven"))
      : { avatar: "", name: "" };
  } catch (error) {
    return { avatar: "", name: "" };
  }
};
