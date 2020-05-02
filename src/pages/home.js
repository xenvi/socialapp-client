import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

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
  body: {
    background: "#fafafa",
    marginTop: 70,
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
    color: "rgb(0,0,0,0.7)",
    margin: "10px auto 05px auto",
    fontWeight: "bold",
    fontSize: 30,
    width: "100%",
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
    const {
      classes,
      user: {
        credentials: { handle, imageUrl },
      },
    } = this.props;
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <Fragment>
        <Navbar />
        <Grid container spacing={0} className={classes.body}>
          <Grid item className="stickybar"></Grid>{" "}
          <Grid item className="feed">
            <Typography className={classes.sectionTitle}>Home</Typography>
            <CreatePost />
            {recentPostsMarkup}
          </Grid>
          <Grid item className="stickybar">
            <div className={classes.profile}>
              <img
                src={imageUrl}
                className={classes.profileImg}
                alt="profile"
              />
              <Typography
                className={classes.handle}
                component={Link}
                to={`/users/${handle}`}
              >
                {handle}
              </Typography>
            </div>
          </Grid>{" "}
          <div className={classes.pagebottomNav}>
            <span>ABOUT</span>
            <span>SUPPORT</span>
            <span>PRIVACY POLICY</span>
            <span>TERMS</span>
            <span>DEVELOPMENT</span>
            <span>API</span>
            <span>JOBS</span>
            <span>© SA 2019</span>
          </div>
        </Grid>
      </Fragment>
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
