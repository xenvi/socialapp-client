import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//mui
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    padding: "0 2em",
    width: "100%",
  },
  comment: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    margin: "5px 0",
  },
  commentImage: {
    width: 50,
    height: 50,
    objectFit: "cover",
    borderRadius: "50%",
    marginRight: 10,
  },
  commentData: {
    marginLeft: 10,
    paddingBottom: 10,
  },
  handle: {
    fontSize: 17,
    color: theme.palette.primary.dark,
    marginRight: 5,
  },
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <div className={classes.container}>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment>
              <div key={createdAt} className={classes.comment}>
                <img
                  src={userImage}
                  alt="comment"
                  className={classes.commentImage}
                />

                <div className={classes.commentData}>
                  <Typography
                    component={Link}
                    to={`/users/${userHandle}`}
                    className={classes.handle}
                  >
                    {userHandle}
                  </Typography>

                  <Typography variant="body1">{body}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                  </Typography>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
