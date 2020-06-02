import React, { Component } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Post from "../post/Post";
import PostSkeleton from "../../util/PostSkeleton";

import { connect } from "react-redux";
import { getLikedPosts } from "../../redux/actions/dataActions";

const styles = (theme) => ({
})

export class ProfileLikes extends Component {
    componentDidMount() {
        const handle = this.props.handle
        this.props.getLikedPosts(handle);
    }
    render() {
        const {
            classes,
            data: {
                loading, posts
            }
          } = this.props;

    // filter posts by createdAt
    const orderedPosts = posts.sort(function (a, b) {
        var c = new Date(a.createdAt);
        var d = new Date(b.createdAt);
        return d - c;
      });
  
      let postsMarkup = loading ? <PostSkeleton /> : posts.length === 0 ? (
        <div className={classes.loadingCircle}>No posts to display. Follow users or make a post!</div>
      ) : (orderedPosts.map((post) => <Post key={post.postId} post={post} />)
      );

        return(
        <section className={classes.timeline}>
              {postsMarkup}
          </section>
          )
    }
}

ProfileLikes.propTypes = {
  getLikedPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    data: state.data
  });
const mapActionsToProps = {
    getLikedPosts
  };

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ProfileLikes));
  