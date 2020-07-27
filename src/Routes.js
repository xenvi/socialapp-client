import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
//Pages
import Cover from "./pages/Cover";
import Home from "./pages/Home";
import User from "./pages/User";
import Explore from "./pages/Explore";
import News from "./pages/News";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
//Components
import Leftbar from "./components/layout/Leftbar";
import Rightbar from "./components/layout/Rightbar";

const styles = () => ({
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  },
});

class Routes extends Component{
  render(){
    const { classes } = this.props;
    return(
        <Switch>
          <Route exact path="/" component={Cover} />
              <Fragment>
                <div className={classes.container}>
                  <Leftbar />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/explore" component={Explore} />
                  <Route exact path="/news" component={News} />
                  <Route exact path="/users/:handle" component={User} />
                  <Route exact path="/users/:handle/followers" component={Followers} />
                  <Route exact path="/users/:handle/following" component={Following} />
                  <Route
                    exact
                    path="/users/:handle/post/:postId"
                    component={User}
                  />
                  <Rightbar />
                </div>
              </Fragment>
        </Switch>
      )
  }
}

export default withStyles(styles)(Routes);