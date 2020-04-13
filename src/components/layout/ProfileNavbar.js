import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MaterialUI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

// icons
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  navBar: {
    boxShadow: "0 0px 5px rgba(0,0,0,0.2)",
    position: "fixed",
  },
  link: {
    color: "#fff",
  },
  flex: {},
  placeholder: {
    padding: 20,
  },
});

const ProfileNavbar = (props) => {
  const {
    classes,
    profile: { handle },
  } = props;

  return (
    <AppBar color="primary" position="static" className={classes.navBar}>
      <Toolbar className="profileNav gradientbg">
        <Link to="/home" className={classes.link} edge="start">
          <ArrowBack color="#fff" fontSize="large" />
        </Link>
        <Link to={`/users/${handle}`} className={classes.link}>
          <Typography variant="h5" className={classes.handle}>
            {handle}
          </Typography>
        </Link>
        <div className={classes.placeholder} />
      </Toolbar>
    </AppBar>
  );
};

ProfileNavbar.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileNavbar);
