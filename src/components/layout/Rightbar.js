import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Notifications from "./Notifications";

// MaterialUI imports
import { Typography } from "@material-ui/core";

// redux imports
import { connect } from "react-redux";

// icons
import HomeIcon from "@material-ui/icons/Home";

const styles = (theme) => ({
  ...theme.spread,
  rightbar: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#333",
    width: "20em",
    height: "100%",
    marginLeft: "auto",
    overflow: "auto",
  },
});

export class Rightbar extends Component {
  render() {
    const { classes } = this.props;

    return <div className={classes.rightbar}></div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Rightbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Rightbar));
