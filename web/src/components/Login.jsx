import React, { useEffect, Fragment } from "react";
import { GetTokenAuthUrl, setLocalStoage } from "../utils/Auth";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;

function Login() {
  let location = useLocation();
  let history = useHistory();
  let { addToast } = useToasts();

  useEffect(() => {
    getAuth();
  });

  const getAuth = () => {
    let code = new URLSearchParams(location.search).get("code");
    let state = new URLSearchParams(location.search).get("state");
    if (code) {
      GetTokenAuthUrl(code, state, (error, user) => {
        if (error) {
          addToast("Unable to login! Please try again", {
            appearance: "error",
            autoDismiss: true,
          });
        }
        if (user) {
          history.push("/space");
        }
      });
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
      default:
        window.location.assign(
          `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URL}`
        );
        break;
    }
  };

  return (
    <Fragment>
      <div className="context-login">
        <div className="container">
          <div className="row">
            <div className="col-1 col-sm-2 col-md-2"></div>
            <div className="col-10 col-sm-8 col-md-8">
              <div className="login">
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <div>
                      <h3 className="tilte">Welcome</h3>
                    </div>
                  </div>
                  <div className="col-2"></div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <div>
                      <div className="sub-title">
                        Sign in to create personalized spaces
                      </div>
                    </div>
                  </div>
                  <div className="col-2"></div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <button
                      className="google"
                      onClick={() => handleClick("Google")}
                    >
                      <img
                        className="logo-icon"
                        alt="google"
                        src="assets/google.svg"
                      />
                      Google
                    </button>
                  </div>
                  <div className="col-2"></div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <button
                      className="github"
                      onClick={() => handleClick("Github")}
                    >
                      <img
                        className="logo-icon"
                        alt="github"
                        src="assets/github.svg"
                      />
                      Github
                    </button>
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
            </div>
            <div className="col-1 col-sm-2 col-md-2"></div>
          </div>
        </div>
      </div>
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </Fragment>
  );
}

export default withRouter(Login);
