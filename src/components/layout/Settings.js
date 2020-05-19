import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI stuff
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";

// Icons
import SettingsIcon from "@material-ui/icons/Settings";

// Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spread,
  popover: {
    marginTop: 10,
  },
  settingsContainer: {
    padding: "0 0.5em",
  },
  listItem: {
    letterSpacing: "1px",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
  },
});

const Button = withStyles((theme) => ({
  root: {
    padding: 0,
  },
}))(IconButton);

class Settings extends Component {
  state = {
    anchorEl: null,
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {};
  render() {
    const anchorEl = this.state.anchorEl;
    const { classes } = this.props;

    return (
      <Fragment>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          <SettingsIcon className={classes.icon} />
        </Button>
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
          className={classes.popover}
        >
          <div className={classes.settingsContainer}>
            <MenuItem
              onClick={() => this.handleLogout()}
              className={classes.listItem}
            >
              LOGOUT
            </MenuItem>
          </div>
        </Popover>
      </Fragment>
    );
  }
}

Settings.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(null, { logoutUser })(withStyles(styles)(Settings));
