import React, { useEffect } from "react";
import { GetTokenAuthUrl } from "../utils/Auth";
import { withRouter, useLocation } from "react-router-dom";
import { GithubLoginButton } from "react-social-login-buttons";

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;

const handleClick = () => {
  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`
  );
};

function Login() {
  let location = useLocation();
  useEffect(() => {
    GetTokenAuthUrl(location.search.replace("?code=", ""));
  }, [location]);
  const getParams = () => {
    console.log("location", location.search.replace("?code=", ""));
  };
  return (
    <div>
      <GithubLoginButton onClick={handleClick} />
      <button onClick={getParams}>Button</button>
    </div>
  );
}

export default withRouter(Login);
