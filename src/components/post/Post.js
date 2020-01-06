import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";

// Mui imports
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

// redux imports
import { connect } from "react-redux";

// icons
import ChatIcon from "@material-ui/icons/CommentOutlined";

const styles = theme => ({
  ...theme.spread,
  card: {
    position: "relative",
    display: "flex",
    paddingBottom: 15,
    background: "#fff",
    boxShadow: "0 5px 5px rgba(0,0,0,0.2)",
    marginTop: 1
  },
  image: {
    borderRadius: "50%",
    width: 60,
    height: 60,
    margin: "15px 0 auto 15px",
    objectFit: "cover"
  },
  content: {
    padding: "15px 15px 0px 15px"
  }
});

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        userHandle,
        userImage,
        createdAt,
        body,
        postId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    // delete post button
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;

    return (
      <div className={classes.card}>
        <Grid container>
          <Grid item>
            <img src={userImage} className={classes.image} alt="profile" />
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
                <Typography
                  variant="h5"
                  component={Link}
                  to={`/users/${userHandle}`}
                  color="primary"
                >
                  {userHandle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1">{body}</Typography>

                <div className={classes.wrap}>
                  <LikeButton postId={postId} />
                  <span className={classes.rightSpace}>{likeCount}</span>
                  <ChatIcon color="primary" className={classes.icon} />
                  <span>{commentCount}</span>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              {deleteButton}
              <PostDialog
                postId={postId}
                userHandle={userHandle}
                openDialog={this.props.openDialog}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
