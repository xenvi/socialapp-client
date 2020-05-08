import React, { Fragment } from "react";
import NoImg from "../images/no-img.jpg";
import PropTypes from "prop-types";

// mUI imports
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  ...theme.spread,
  content: {
    width: "100%",
    flexDirection: "column",
    padding: "1em",
  },
  image: {
    borderRadius: "50%",
    width: 60,
    height: 60,
    margin: "15px 0 auto 15px",
    objectFit: "cover",
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: "90%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  halfLine: {
    height: 15,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});

const PostSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <div className="card" key={index}>
      <Grid container>
        <Grid item>
          <img src={NoImg} className={classes.image} alt="profile" />
        </Grid>
        <Grid item sm xs container>
          <Grid
            item
            xs
            container
            direction="column"
            spacing={1}
            className={classes.content}
          >
            <Grid item xs>
              <div className={classes.handle} />
              <div className={classes.fullLine} />
              <div className={classes.fullLine} />
              <div className={classes.halfLine} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ));
  return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostSkeleton);
