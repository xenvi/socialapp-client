import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MuiLink from "@material-ui/core/Link";
// icons
import HomeIcon from "@material-ui/icons/Home";

const styles = theme => ({
  ...theme.spread,
  card: {
    position: "relative",
    display: "flex",
    textAlign: "center",
    verticalAlign: "center",
    margin: "0 10px 10px 0",
    padding: 20,
    background: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  link: {
    display: "flex",
    verticalAlign: "middle",
    margin: "0 auto",
    fontWeight: "bold",
    color: "rgba(0,0,0,0.7)"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: 5
  },
  span: {
    height: 30
  }
});

export class SideNav extends Component {
  render() {
    const {
      classes,
      authenticated,
      user: {
        credentials: { imageUrl, handle }
      }
    } = this.props;

    return (
      <div className={classes.card}>
        {authenticated ? (
          <Fragment>
            <div className={classes.wrapper}>
              <hr className={classes.thickSeparator} />
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                className={classes.link}
                variant="body1"
                underline="none"
              >
                <span className={classes.span}>
                  <img src={imageUrl} alt="profile" className={classes.image} />
                </span>
                Profile
              </MuiLink>
              <hr className={classes.thickSeparator} />
              <MuiLink
                component={Link}
                to="/home"
                className={classes.link}
                variant="body1"
                underline="none"
              >
                <span className={classes.span}>
                  <HomeIcon color="primary" />
                </span>
                Home
              </MuiLink>
              <hr className={classes.thickSeparator} />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={classes.wrapper}>
              <hr className={classes.thickSeparator} />
              <MuiLink
                component={Link}
                to="/login"
                className={classes.link}
                variant="body1"
                underline="none"
              >
                LOGIN
              </MuiLink>
              <hr className={classes.thickSeparator} />
              <MuiLink
                component={Link}
                to="/signup"
                className={classes.link}
                variant="body1"
                underline="none"
              >
                SIGNUP
              </MuiLink>
              <hr className={classes.thickSeparator} />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

SideNav.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(SideNav));
