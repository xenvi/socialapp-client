import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    padding: "1em 2em 0 2em",
    width: "100%",
    background: "#11121f",
  },
  comment: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
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
    paddingBottom: "1em",
    color: "#a8abbf",
  },
  handle: {
    fontSize: 17,
    color: theme.palette.primary.light,
    marginRight: 5,
  },
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <div className={classes.container} id="commentsContainer">
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <div key={createdAt} className={classes.comment}>
              <img
                src={userImage}
                alt="comment"
                className={classes.commentImage}
              />

              <div className={classes.commentData} id="commentData">
                <Link to={`/users/${userHandle}`} className={classes.handle}>
                  {userHandle}
                </Link>

                <div>{body}</div>
                <div className={classes.date}>
                  {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                </div>
              </div>
            </div>
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
