import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
import Routes from "./Routes";
import Leftbar from "./components/layout/Leftbar";
import Rightbar from "./components/layout/Rightbar";
// import AuthRoute from "./util/AuthRoute";
import themeFile from "./util/theme";
//Pages
import Cover from "./pages/Cover";
import Home from "./pages/Home";
import User from "./pages/User";
import Explore from "./pages/Explore";
import News from "./pages/News";
import Followers from "./pages/Followers";
import Following from "./pages/Following";

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



class App extends Component {
  render() {
    
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Routes />
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
