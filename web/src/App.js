import React, { Suspense } from "react";
import { isAuthenticated } from "./utils/Auth";
import Error from "./components/Error";
import Home from "./components/Home";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { isAuthenticated } from "./util/auth";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <PrivateRoute component={Home} {...props} />}
          />
          <Route
            exact
            path="/signin"
            render={(props) => <PublicRoute component={Home} {...props} />}
          />
          <Route exact path="*" render={(props) => <Error {...props} />} />
        </Switch>
      </Router>
    </ToastProvider>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Suspense fallback={<div>Loading..</div>}>
          <Navigation>
            <Component {...props} />
          </Navigation>
        </Suspense>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated() ? (
        <Suspense fallback={<div>Loading..</div>}>
          <Component {...props} />
        </Suspense>
      ) : (
        <Redirect
          to={{
            pathname: "/home",
          }}
        />
      )
    }
  />
);

export default App;
