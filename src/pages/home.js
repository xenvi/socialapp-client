import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Navbar from "../components/layout/Navbar";

import Post from "../components/post/Post";
import PostSkeleton from "../util/PostSkeleton";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <Fragment>
        <Navbar />
        <Grid container spacing={0}>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
          <Grid item sm={4} xs={12}>
            {recentPostsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}></Grid>
        </Grid>
      </Fragment>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getPosts })(home);
