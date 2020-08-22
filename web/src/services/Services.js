import axios from "axios";
import { AuthToken } from "../utils/Auth";

const baseURL = process.env.REACT_APP_SERVER_URL;

export const CreateSpace = async (data, callback) => {
  axios
    .post(`${baseURL}/space`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthToken(),
      },
    })
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const GetSpace = (callback) => {
  axios
    .get(`${baseURL}/spaces`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthToken(),
      },
    })
    .then(({ data }) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const RunSpace = (data, callback) => {
  axios
    .post(`${baseURL}/space/run`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthToken(),
      },
    })
    .then(({ data }) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const CreateCheck = (data, callback) => {
  axios
    .post(`${baseURL}/check`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthToken(),
      },
    })
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const GetCheck = (callback) => {
  axios
    .get(`${baseURL}/checks`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthToken(),
      },
    })
    .then(({ data }) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};
