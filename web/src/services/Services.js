import axios from "axios";
import { AuthToken } from "../utils/Auth";
axios.defaults.headers.common["Authorization"] = AuthToken();
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const CreateSpace = (data) => {
  axios
    .post(`/space`, data)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const GetSpace = (data) => {
  axios
    .get(`/spaces`, data)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
