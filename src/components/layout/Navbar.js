import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import CreatePost from "../post/CreatePost";
import Notifications from "./Notifications";
import withStyles from "@material-ui/core/styles/withStyles";

// MaterialUI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// icons
import HomeIcon from "@material-ui/icons/Home";

const styles = theme => ({
  image: {
    width: 25,
    height: 25,
    borderRadius: "50%"
  },
  navBar: {
    boxShadow: "0 0px 5px rgba(0,0,0,0.2)",
    position: "static"
  }
});

export class Navbar extends Component {
  render() {
    const {
      classes,
      authenticated,
      user: {
        credentials: { imageUrl, handle }
      }
    } = this.props;

    return (
      <AppBar color="tertiary" className={classes.navBar}>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <Link to="/home">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>

              <CreatePost />

              <Notifications />

              <Link to={`/users/${handle}`}>
                <MyButton tip="Profile">
                  <img src={imageUrl} alt="profile" className={classes.image} />
                </MyButton>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/home">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
