import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeletePost from "./DeletePost";

// Mui imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

// redux imports
import { connect } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/dataActions";

// icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

class Post extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.postId === this.props.post.postId)
    )
      return true;
    else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };

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
    const likeButton = !authenticated ? (
      // if not authenticated, link to login
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : // if authenticated and...
    this.likedPost() ? (
      // post is already liked: unlike
      <MyButton tip="Unlike" onClick={this.unlikePost}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      // post isn't already liked: like
      <MyButton tip="Like" onClick={this.likePost}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    // delete post button
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToProps = {
  likePost,
  unlikePost
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Post));
