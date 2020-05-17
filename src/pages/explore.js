import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Navbar from "../components/layout/Navbar";

import Post from "../components/post/Post";
import PostSkeleton from "../util/PostSkeleton";
import CreatePost from "../components/post/CreatePost";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spread,
  posts: {
    background: "#fafafa",
    minHeight: "60vh",
  },
  mainContainer: {
    overflow: "auto",
    textAlign: "center",
  },
  body: {
    background: "#fafafa",
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  profileImg: {
    width: 55,
    height: 55,
    borderRadius: "50%",
    objectFit: "cover",
  },
  handle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 2,
    textAlign: "left",
    padding: "0.2em 0.2em 0.2em 0.5em",
    borderBottom: "0.1em solid #222540",
  },
  copyright: {
    background: "#fff",
    width: "auto",
    boxShadow: "0 0px 3px rgba(0,0,0,0.2)",
    padding: 15,
    fontSize: 11,
    marginTop: "2em",
    lineHeight: "200%",
  },
  bottomNav: {
    color: "#333",
  },
});

class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { classes } = this.props;
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <main className="main">
        <Navbar />
        <section className={classes.mainContainer} id="mainContainer">
          <Grid item className="feed">
            <Typography className={classes.sectionTitle}>Explore</Typography>
            <CreatePost />
            {recentPostsMarkup}
          </Grid>{" "}
        </section>
      </main>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { getPosts })(withStyles(styles)(home));
