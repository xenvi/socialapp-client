import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import PostSkeleton from "../util/PostSkeleton";
import Navbar from "../components/layout/Navbar";

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
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
          <Grid item sm={8} xs={12}>
            {recentPostsMarkup}
          </Grid>
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
