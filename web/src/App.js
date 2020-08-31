import React, { Suspense } from "react";
import { isAuthenticated } from "./utils/Auth";
import Space from "./components/Space";
import Checks from "./components/Checks";
//import Loading from "./components/Loading";
import Main from "./components/Main";
import Error from "./components/Error";
import Home from "./components/Home";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <RecoilRoot>
      <ToastProvider>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <PrivateRoute component={Space} {...props} />}
            />
            <Route
              exact
              path="/space"
              render={(props) => <PrivateRoute component={Space} {...props} />}
            />
            <Route
              exact
              path="/home"
              render={(props) => <PublicRoute component={Home} {...props} />}
            />
            <Route
              exact
              path="/login"
              render={(props) => <PublicRoute component={Login} {...props} />}
            />
            <Route
              exact
              path="/checks"
              render={(props) => <PrivateRoute component={Checks} {...props} />}
            />
            <Route
              exact
              path="/main"
              render={(props) => <PrivateRoute component={Main} {...props} />}
            />
            <Route exact path="*" render={(props) => <Error {...props} />} />
          </Switch>
        </Router>
      </ToastProvider>
    </RecoilRoot>
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
