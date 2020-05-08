import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";

// redux imports
import { connect } from "react-redux";

// icons
import ChatIcon from "@material-ui/icons/CommentOutlined";

const styles = (theme) => ({
  ...theme.spread,
  image: {
    borderRadius: "50%",
    width: 60,
    height: 60,
    objectFit: "cover",
  },
  content: {
    paddingLeft: "1em",
  },
  handle: {
    fontSize: 18,
    color: theme.palette.primary.light,
  },
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
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    // delete post button
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;

    return (
      <div className="card">
        <div className={classes.cardWrapper}>
          <img src={userImage} className={classes.image} alt="profile" />
          <div className={classes.content}>
            <Link to={`/users/${userHandle}`} className={classes.handle}>
              {userHandle}
            </Link>
            <div className={classes.date}>{dayjs(createdAt).fromNow()}</div>
            <div>{body}</div>
          </div>
          {deleteButton}
        </div>
        <div className={classes.wrap}>
          <LikeButton postId={postId} />
          <span className={classes.rightSpace}>{likeCount}</span>
          <ChatIcon className={classes.wrapIcon} />
          <span>{commentCount}</span>
        </div>
        <PostDialog
          postId={postId}
          userHandle={userHandle}
          openDialog={this.props.openDialog}
        />
      </div>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
