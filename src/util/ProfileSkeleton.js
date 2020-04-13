import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from "../images/no-img.png";

import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.spread,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "7px auto",
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10,
  },
  website: {
    fontWeight: "bold",
    color: theme.palette.primary.dark,
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <div className={classes.profile}>
      <div className="image-wrapper">
        <img src={NoImg} alt="profile" className="profile-image" />
      </div>
      <div className="profile-details">
        <div className={classes.handle} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <Typography variant="body1" className={classes.website}>
          https://website.com
        </Typography>
        <Typography variant="body2">Joined date</Typography>
      </div>
    </div>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
