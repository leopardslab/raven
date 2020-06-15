import React, { useEffect, useState } from "react";
import { GetTokenAuthUrl } from "../utils/Auth";
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
  let [oauthService, setOauthService] = useState("");

  useEffect(() => {
    getAuth();
  }, [location]);

  const getAuth = () => {
    let code = location.search.replace("?code=", "");
    if (code) {
      GetTokenAuthUrl(code, oauthService);
    }
  };

  const handleClick = (type) => {
    setOauthService(type);
    switch (type) {
      case "Github":
        window.location.assign(
          `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URL}`
        );
        break;
      case "Goolge":
        window.location.assign(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=`
        );
        break;
      case "Twitter":
        window.location.assign(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=`
        );
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
      <TwitterLoginButton
        onClick={() => {
          handleClick("Twitter");
        }}
      />
    </div>
  );
}

export default withRouter(Login);
