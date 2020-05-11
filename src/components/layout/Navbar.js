import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Notifications from "./Notifications";

// MaterialUI imports
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

// redux imports
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spread,
  navbar: {
    display: "flex",
    alignItems: "center",
    boxShadow: "0 5px 5px rgba(0,0,0,0.2)",
    width: "100%",
    background: "#161829",
    padding: "0.7em",
    height: "4em",
  },
  searchTextField: {
    background: "none",
    fontWeight: 400,
    border: "2px solid #23a65",
    borderWidth: " 2px",
    borderStyle: "solid",
    borderImage: " linear-gradient(45deg, #e73c7e, #23a6d5) 20% stretch",
    width: "50%",
    height: "100%",
    padding: "0.2em 1em",
  },
  paddedIcon: {
    fontSize: 25,
    color: "#fff",
    margin: "0 0.75em 0 0.5em",
  },
  hiddenNav: {
    display: "none",
    alignItems: "center",
    marginLeft: "auto",
    padding: "1em",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    margin: "0 0 0 10px",
    objectFit: "cover",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    color: "#a8abbf",
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
      <nav className={classes.navbar}>
        <SearchIcon className={classes.paddedIcon} />
        <TextField
          id="search"
          type="text"
          name="search"
          placeholder="Search ..."
          className={classes.searchTextField}
          InputProps={{
            disableUnderline: true,
            style: {
              color: "#fff",
            },
          }}
          FormHelperTextProps={{
            classes: { root: classes.helperText },
          }}
        />

        <div className={classes.hiddenNav} id="hiddenNav">
          <Link to={`/users/${handle}`} className={classes.profileLink}>
            {handle}
            <img src={imageUrl} alt="profile" className={classes.image} />
          </Link>
          <Notifications />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
