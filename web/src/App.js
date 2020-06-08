import React, { Suspense } from "react";
import { isAuthenticated } from "./utils/Auth";
import Error from "./components/Error";
import Home from "./components/Home";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Redirect to="/home" {...props} />}
        />
        <Route
          exact
          path="/home"
          render={(props) => <PrivateRoute component={Home} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <PublicRoute component={Login} {...props} />}
        />
        <Route exact path="*" render={(props) => <Error {...props} />} />
      </Switch>
    </Router>
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
