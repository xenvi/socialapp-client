import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spread,
});

class LikeButton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.postId === this.props.postId)
    )
      return true;
    else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.postId);
  };
  render() {
    const { classes } = this.props;
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      // if not authenticated, link to cover page
      <Link to="/">
        <FavoriteBorder className={classes.wrapIcon} id="likeBtn" />
      </Link>
    ) : // if authenticated and...
    this.likedPost() ? (
      // post is already liked: unlike
      <FavoriteIcon
        onClick={this.unlikePost}
        className={classes.wrapIcon}
        id="likeBtn"
      />
    ) : (
      // post isn't already liked: like

      <FavoriteBorder
        onClick={this.likePost}
        className={classes.wrapIcon}
        id="likeBtn"
      />
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(LikeButton));
