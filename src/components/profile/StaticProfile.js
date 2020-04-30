import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import ProfileSkeleton from "../../util/ProfileSkeleton";
import EditDetails from "./EditDetails";

// MUI
import MuiLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";

//icons
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";

import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spread,
  name: {
    fontWeight: "bold",
  },
  iconButton: {
    borderRadius: "50%",
  },
  editButton: {
    position: "absolute",
    borderRadius: "50%",
    bottom: 0,
  },
  moreMenu: {
    width: 70,
    padding: 5,
  },
  menuLabels: {
    textAlign: "center",
  },
  website: {
    color: theme.palette.primary.dark,
    fontWeight: "bold",
  },
  detailsContainer: {
    margin: "10px 0 5px 0",
  },
  bio: {
    margin: "5px 0 15px 0",
  },
});

class StaticProfile extends Component {
  state = {
    anchorEl: null,
  };
  handleOpen = (e) => {
    this.setState({ anchorEl: e.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
    window.location.href = "/";
  };
  render() {
    const anchorEl = this.state.anchorEl;
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const {
      classes,
      user: {
        credentials: { handle },
        loading,
      },
      userHandle,
      profile: { createdAt, imageUrl, bio, website },
    } = this.props;

    let profileMarkup = !loading ? (
      handle === userHandle ? (
        <Grid container className={classes.profile} direction="column">
          <Grid container xs>
            <Grid item xs>
              <div className="image-wrapper">
                <img src={imageUrl} alt="profile" className="profile-image" />
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <IconButton
                  variant="contained"
                  onClick={this.handleEditPicture}
                  className={classes.editButton}
                >
                  <EditIcon color="primary" className={classes.editButton} />
                </IconButton>
              </div>
            </Grid>
          </Grid>
          <Grid container xs>
            <Grid item xs>
              <div className="profile-details">
                <MuiLink
                  component={Link}
                  underline="none"
                  variant="h5"
                  to={`/users/${userHandle}`}
                  color="primary"
                  className={classes.name}
                >
                  {handle}
                </MuiLink>
                {bio && (
                  <Typography variant="body2" className={classes.bio}>
                    {bio}
                  </Typography>
                )}

                {website && (
                  <Typography variant="body1">
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.website}
                    >
                      {" "}
                      {website}
                    </a>
                  </Typography>
                )}
                <Typography variant="body2">
                  Joined {dayjs(createdAt).format("MMM YYYY")}
                </Typography>
                <div className={classes.detailsContainer}>
                  <EditDetails />
                  <IconButton
                    aria-describedby={id}
                    onClick={this.handleOpen}
                    className={classes.iconButton}
                  >
                    <SettingsIcon
                      color="primary"
                      className={classes.moreButton}
                    />
                  </IconButton>
                  <Popover
                    elevation={1}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <div className={classes.moreMenu}>
                      <Typography color="secondary" variant="body1">
                        <Link
                          to={this.handleLogout}
                          className={classes.menuLabels}
                        >
                          Logout
                        </Link>
                      </Typography>
                    </div>
                  </Popover>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.profile} direction="column">
          <Grid container xs>
            <Grid item xs>
              <div className="image-wrapper">
                <img src={imageUrl} alt="profile" className="profile-image" />
              </div>
            </Grid>
          </Grid>
          <Grid container xs>
            <Grid item xs>
              <div className="profile-details">
                <MuiLink
                  component={Link}
                  underline="none"
                  variant="h5"
                  to={`/users/${userHandle}`}
                  color="primary"
                  className={classes.name}
                >
                  {userHandle}
                </MuiLink>
                {bio && (
                  <Typography variant="body2" className={classes.bio}>
                    {bio}
                  </Typography>
                )}

                {website && (
                  <Typography variant="body1">
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.website}
                    >
                      {" "}
                      {website}
                    </a>
                  </Typography>
                )}
                <Typography variant="body2">
                  Joined {dayjs(createdAt).format("MMM YYYY")}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      )
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

const mapActionsToProps = {
  logoutUser,
  uploadImage,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

StaticProfile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(StaticProfile));
