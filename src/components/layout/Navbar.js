import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Notifications from "./Notifications";

// MaterialUI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";

// redux imports
import { connect } from "react-redux";

// icons
import HomeIcon from "@material-ui/icons/Home";

const styles = (theme) => ({
  ...theme.spread,
  image: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    margin: "0 0 0 10px",
    objectFit: "cover",
  },
  navbar: {
    boxShadow: "0 5px 5px rgba(0,0,0,0.2)",
    width: "100%",
    background: "#333",
    padding: "0.7em 0",
  },
  icons: {
    fontSize: 30,
    margin: "0 10px",
  },
  rightNav: {
    display: "flex",
    alignItems: "center",
  },
});

export class Navbar extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, imageUrl },
      },
    } = this.props;

    return (
      <div className={classes.navbar}>
        <div className="nav-container">
          <Link to="/home">
            <Typography className={classes.smallBrand} edge="start">
              Chatsy
            </Typography>
          </Link>
          <div className={classes.rightNav}>
            {" "}
            <Link to="/home">
              <HomeIcon color="primary" className={classes.icons} />
            </Link>
            <Notifications />
            <Link to={`/users/${handle}`}>
              {handle}
              <img src={imageUrl} alt="profile" className={classes.image} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
