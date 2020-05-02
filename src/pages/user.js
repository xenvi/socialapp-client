import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/post/Post";
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/profile/StaticProfile";
import Navbar from "../components/layout/Navbar";
import Leftbar from "../components/layout/Leftbar";

import Rightbar from "../components/layout/Rightbar";
import PostSkeleton from "../util/PostSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import withStyles from "@material-ui/core/styles/withStyles";

import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    background: "lightblue",
  },
  posts: {
    background: "#fafafa",
    minHeight: "60vh",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
  },
  mainContainer: {
    overflow: "auto",
    padding: "1em",
  },
  profile: {},
});

class user extends Component {
  state = {
    profile: null,
    posts: null,
    userHandle: null,
    postIdParam: null,
  };
  componentDidMount() {
    // component loaded
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });

    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
          userHandle: res.data.user.handle,
          posts: res.data.posts,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const {
      classes,
      data: { loading },
    } = this.props;
    const { postIdParam, profile, posts, userHandle } = this.state;

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
      <div className={classes.container}>
        <Leftbar />
        <main className={classes.main}>
          <Navbar />
          <section className={classes.mainContainer}>text</section>
        </main>
        <Rightbar />
      </div>
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
