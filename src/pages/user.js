import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/post/Post";
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/profile/StaticProfile";
import Navbar from "../components/layout/Navbar";
import PostSkeleton from "../util/PostSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import ProfileNavbar from "../components/layout/ProfileNavbar";
import withStyles from "@material-ui/core/styles/withStyles";

import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    marginTop: 70,
  },
  posts: {
    background: "#fafafa",
    minHeight: "60vh",
  },
});

class user extends Component {
  state = {
    profile: null,
    userHandle: null,
    postIdParam: null,
  };
  componentDidMount() {
    // component loaded
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
          userHandle: res.data.user.handle,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const {
      classes,
      data: { posts, loading },
    } = this.props;
    const { postIdParam } = this.state;

    const postsMarkup = loading ? (
      <PostSkeleton />
    ) : posts === null ? (
      <p>No posts from this user.</p>
    ) : !postIdParam ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      posts.map((post) => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />;
        else return <Post key={post.postId} post={post} openDialog />;
      })
    );

    return (
      <Fragment>
        {this.state.profile === null ? (
          <Navbar />
        ) : (
          <ProfileNavbar profile={this.state.profile} />
        )}

        <Grid container spacing={0} justify="center">
          <Grid item md={12} xs={12} className={classes.container}>
            {this.state.profile === null ? (
              <ProfileSkeleton />
            ) : (
              <StaticProfile
                profile={this.state.profile}
                userHandle={this.state.userHandle}
              />
            )}
            <div className="label">
              <Typography variant="button">Posts</Typography>
            </div>
          </Grid>
          <Grid item md={12} xs className={classes.posts}>
            <div className="center">{postsMarkup}</div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(
  withStyles(styles)(user)
);
