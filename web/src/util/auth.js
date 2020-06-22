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
