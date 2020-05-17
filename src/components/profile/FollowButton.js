import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spread,
  followbtn: {
    margin: "0 1em 0 auto",
    fontSize: 15,
    textShadow: "0 3px 5px rgba(0,0,0,0.5)",
    border: "2px solid #0099ff",
    background: "none",
    color: "#0099ff",
    height: 40,
    borderRadius: "5px",
    fontWeight: "bold",
    width: "8em",
    cursor: "pointer",
    textTransform: "none",
    transition: "0.3s all ease-in-out",
    "&:hover": {
      color: "#00ccff",
      border: "2px solid #00ccff",
      transition: "0.3 all ease-in-out",
    },
    "&:active, &:focus": {
      outline: "none",
    },
  },
  unfollowbtn: {
    margin: "0 1em 0 auto",
    fontSize: 15,
    textShadow: "0 3px 5px rgba(0,0,0,0.5)",
    border: "2px solid #e73c7e",
    background: "none",
    color: "#e73c7e",
    height: 40,
    borderRadius: "5px",
    fontWeight: "bold",
    width: "8em",
    cursor: "pointer",
    textTransform: "none",
    transition: "0.3s all ease-in-out",
    "&:hover": {
      color: "#ff5999",
      border: "2px solid #ff5999",
      transition: "0.3 all ease-in-out",
    },
    "&:active, &:focus": {
      outline: "none",
    },
  },
});

class FollowButton extends Component {
  followedUser = () => {
    if (
      this.props.user.following &&
      this.props.user.following.find(
        (following) => following.recipient === this.props.profileHandle
      )
    )
      return true;
    else return false;
  };
  render() {
    const { classes, profileHandle } = this.props;

    const FollowButton = this.followedUser() ? (
      // user is already followed: unfollow
      <button
        className={classes.unfollowbtn}
        onClick={() => this.props.unfollowUser(profileHandle)}
      >
        Unfollow
      </button>
    ) : (
      // user isn't already followed: follow

      <button
        className={classes.followbtn}
        onClick={() => this.props.followUser(profileHandle)}
      >
        Follow
      </button>
    );
    return FollowButton;
  }
}

FollowButton.propTypes = {
  user: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  followUser,
  unfollowUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(FollowButton));
