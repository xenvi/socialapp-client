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
  leftbar: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#333",
    width: "20em",
    height: "100%",
    borderRight: "2px solid #555",
    transition: "0.3s",
    overflow: "auto",
  },
});

export class Leftbar extends Component {
  render() {
    const { classes } = this.props;

    return <div className={classes.leftbar}></div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Leftbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Leftbar));
