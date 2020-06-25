import React, { Fragment } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import { isAuthenticated, getUserInfo, LogOut } from "../utils/Auth";

function Navigation({ children }) {
  let history = useHistory();
  return (
    <Fragment>
      <div
        id="header"
        className="container d-flex align-items-center raven-navigation"
      >
        <div className="logo mr-auto">
          <h1 className="text-light">
            <Link to="/home">
              <span>Raven</span>
            </Link>
          </h1>
        </div>

        <nav className="nav-menu d-none d-lg-block">
          <ul>
            {isAuthenticated() ? (
              <li className="drop-down">
                <img
                  src={getUserInfo().avatar}
                  alt="avatar"
                  className="raven-avatar"
                />
                <ul>
                  <li>
                    <a href="/#">Account</a>
                  </li>
                  <li>
                    <a
                      href="/#"
                      onClick={() =>
                        LogOut(() => {
                          history.push("/login");
                        })
                      }
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
      <Fragment>{children}</Fragment>
    </Fragment>
  );
}

export default withRouter(Navigation);
