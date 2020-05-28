import React, { Component } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Navbar from "../components/layout/Navbar";

import Post from "../components/post/Post";
import PostSkeleton from "../util/PostSkeleton";
import CreatePost from "../components/post/CreatePost";

import { connect } from "react-redux";
import { getHomePosts } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    width: "auto",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  },
  posts: {
    background: "#fafafa",
    minHeight: "60vh",
  },
  mainContainer: {
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
  loadingCircle: {
    textAlign: "center",
    padding: "2em 0",
    color: "#a8abbf",
  },
});

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
 }
  componentDidMount() {
    const handle = this.props.user.credentials.handle;
    this.props.getHomePosts(handle);
  }
  componentDidUpdate(prevProps) {
    // When user credentials are set, load posts
    if(this.props.user.credentials.handle !== prevProps.user.credentials.handle)
    {
      const handle = this.props.user.credentials.handle;
      this.props.getHomePosts(handle);
    }
  } 
  render() {
    const { classes } = this.props;
    const { posts, loading } = this.props.data;

    // filter posts by createdAt
    const orderedPosts = posts.sort(function (a, b) {
      var c = new Date(a.createdAt);
      var d = new Date(b.createdAt);
      return d - c;
    });

    let recentPostsMarkup = loading ? <PostSkeleton /> : posts.length === 0 ? (
      <div className={classes.loadingCircle}>No posts to display. Follow users or make a post!</div>
    ) : (orderedPosts.map((post) => <Post key={post.postId} post={post} />)
    );
    return (
      <main className="main">
        <Navbar />
        <section className={classes.mainContainer} id="mainContainer">
          <div className="feed">
            <div className={classes.sectionTitle}>Home</div>
            <CreatePost />
            {recentPostsMarkup}
          </div>{" "}
        </section>
      </main>
    );
  }
}

home.propTypes = {
  getHomePosts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { getHomePosts })(withStyles(styles)(home));
