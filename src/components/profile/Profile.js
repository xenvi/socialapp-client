import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import withStyles from "@material-ui/core/styles/withStyles";
//icons
import LinkIcon from "@material-ui/icons/LanguageOutlined";
import LocationIcon from "@material-ui/icons/LocationOnOutlined";
import CalendarIcon from "@material-ui/icons/CalendarTodayOutlined";

import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.spread,
  profile: {
    position: "relative",
    width: "100%",
    height: "35vh",
    minHeight: 230,
    maxHeight: 430,
    background: "#161829",
    borderRadius: 5,
  },
  profileAvatar: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    bottom: 20,
    left: 50,
  },
  imageWrapper: {
    background: "black",
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "0.2em solid #161829",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "0.2em solid #161829",
    objectFit: "cover",
  },
  profileName: {
    marginLeft: 40,
    marginBottom: 30,
    color: "#fff",
    textShadow: "0 0 5px #333",
    fontWeight: 700,
    fontSize: 24,
  },
  profileNav: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    paddingLeft: "20em",
    width: "100%",
    height: 80,
    background: "#161829",
  },
  profileCover: {
    background: "#000",
    width: "100%",
    height: "100%",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    padding: "0 2em",
    cursor: "pointer",
    color: "#999",
    fontWeight: 700,
    letterSpacing: 1,
    borderBottom: "0.3em solid #161829",
    transition: "0.3s all ease-in-out",
    "&:active, &:hover": {
      color: "#fff",
      background: "#2E3146",
      borderBottom: "0.3em solid #0099ff",
      transition: "0.3s all ease-in-out",
    },
  },
  title: {
    color: "#666",
    fontWeight: 700,
    fontSize: "1.1em",
    letterSpacing: 2,
  },
  timeline: {
    display: "flex",
    position: "relative",
    marginTop: "2em",
  },
  timelineLeft: {
    flexShrink: 0,
  },
  timeLineRight: {
    flexGrow: 1,
    marginLeft: "2em",
  },
  infoBox: {
    background: "#161829",
    width: "20em",
    borderRadius: "0.2em",
    padding: "1em",
  },
});

export class Profile extends Component {
  render() {
    const {
      classes,
      profile: { handle, createdAt, imageUrl, bio, website, location },
    } = this.props;
    return (
      <Fragment>
        <div className={classes.profile}>
          <div className={classes.profileCover}></div>
          <div className={classes.profileAvatar}>
            <img src={imageUrl} className={classes.profileImage}></img>
            <div className={classes.profileName}>{handle}</div>
          </div>
          <div className={classes.profileNav}>
            <a className={classes.profileLink}>Timeline</a>
            <a className={classes.profileLink}>About</a>
            <a className={classes.profileLink}>Likes</a>
          </div>
        </div>
        <section className={classes.timeline}>
          <div className={classes.timelineLeft}>
            <div className={classes.infoBox}>
              <div className={classes.title}>ABOUT</div>
              <div className={classes.info}>
                {" "}
                {bio && <Typography variant="body2">{bio}</Typography>}
                {location && (
                  <Fragment>
                    <LocationIcon /> <span>{location}</span>
                    <hr />
                  </Fragment>
                )}
                {website && (
                  <Fragment>
                    <LinkIcon />
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {" "}
                      {website}
                    </a>
                    <hr />
                  </Fragment>
                )}
                <CalendarIcon />{" "}
                <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
              </div>
            </div>
          </div>
          <div className={classes.timelineRight}>test</div>
        </section>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
