import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI stuff
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import Popover from "@material-ui/core/Popover";

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import PostIcon from '@material-ui/icons/Create';

// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spread,
  popover: {
    marginTop: 10,
  },
  notificationContainer: {
    padding: "1em",
  },
});

const Button = withStyles((theme) => ({
  root: {
    padding: 12,
  },
}))(IconButton);

class Notifications extends Component {
  state = {
    anchorEl: null,
  };
  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };
  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;
    const { classes } = this.props;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon className={classes.icon} />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon className={classes.icon} />);
    } else {
      notificationsIcon = <NotificationsIcon className={classes.icon} />;
    }
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === "like" ? "liked your post" : not.type === "comment" ? "commented on your post" : "posted on your profile";
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? "primary" : "secondary";
          const icon =
            not.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : not.type === "comment" ? (
              <CommentIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <PostIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <Link key={not.createdAt} to={`/users/${not.recipient}/post/${not.postId}`}>
              <MenuItem onClick={this.handleClose}>
              {icon}
              <div
                className="notification"
              >
                {not.sender} {verb} {time}
              </div>
            </MenuItem>
            </Link>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );
    return (
      <Fragment>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          {notificationsIcon}
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
          <div className={classes.notificationContainer}>
            {notificationsMarkup}
          </div>
        </Popover>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  withStyles(styles)(Notifications)
);
