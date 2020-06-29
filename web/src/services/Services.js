import axios from "axios";
import { AuthToken } from "../utils/Auth";
axios.defaults.headers.common["Authorization"] = AuthToken();
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const CreateSpace = (data, callback) => {
  axios
    .post(`/space`, data)
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const GetSpace = (callback) => {
  axios
    .get(`/spaces`)
    .then(({ data }) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};
