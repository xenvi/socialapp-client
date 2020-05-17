import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import "./App.css";
import "./script.js";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import axios from "axios";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
//Components
import Leftbar from "./components/layout/Leftbar";

import Rightbar from "./components/layout/Rightbar";
// import AuthRoute from "./util/AuthRoute";
import themeFile from "./util/theme";
//Pages
import cover from "./pages/cover";
import home from "./pages/home";
import user from "./pages/user";
import explore from "./pages/explore";
import news from "./pages/news";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
  "https://us-central1-socialapp-79173.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

const styles = () => ({
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={cover} />
              <Fragment>
                <div className={classes.container}>
                  <Leftbar />
                  <Route exact path="/home" component={home} />
                  <Route exact path="/explore" component={explore} />
                  <Route exact path="/news" component={news} />
                  <Route exact path="/users/:handle" component={user} />
                  <Route
                    exact
                    path="/users/:handle/post/:postId"
                    component={user}
                  />{" "}
                  <Rightbar />
                </div>
              </Fragment>
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
