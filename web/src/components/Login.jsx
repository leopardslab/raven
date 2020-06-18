import React, { useEffect, useState } from "react";
import { GetTokenAuthUrl, setLocalStoage } from "../utils/Auth";
import { withRouter, useLocation } from "react-router-dom";
import {
  GithubLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";

const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;

function Login() {
  let location = useLocation();

  useEffect(() => {
    getAuth();
  }, [location]);

  const getAuth = () => {
    let code = new URLSearchParams(location.search).get("code");
    let state = new URLSearchParams(location.search).get("state");
    if (code) {
      GetTokenAuthUrl(code, state);
    }
  };

  const handleClick = (type) => {
    setLocalStoage("provider", type);
    switch (type) {
      case "Github":
        window.location.assign(
          `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URL}`
        );
        break;
      case "Google":
        window.location.assign(
          `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.email&state=state_parameter_passthrough_value&redirect_uri=${REDIRECT_URL}&access_type=offline&response_type=code&client_id=${GOOGLE_CLIENT_ID}`
        );
        break;
      case "Twitter":
        window.location.assign(`https://api.twitter.com/oauth/request_token`);
        break;
    }
  };

  return (
    <div>
      <GithubLoginButton
        onClick={() => {
          handleClick("Github");
        }}
      />
      <GoogleLoginButton
        onClick={() => {
          handleClick("Goolge");
        }}
      />
      {/* <TwitterLoginButton
        onClick={() => {
          handleClick("Twitter");
        }}
      /> */}
    </div>
  );
}

export default withRouter(Login);
