import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";

import Navbar from "../components/layout/Navbar";
import Leftbar from "../components/layout/Leftbar";
import Rightbar from "../components/layout/Rightbar";
import Post from "../components/post/Post";
import CreatePost from "../components/post/CreatePost";
import PostSkeleton from "../util/PostSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
//icons
import LinkIcon from "@material-ui/icons/LanguageOutlined";
import LocationIcon from "@material-ui/icons/LocationOnOutlined";
import CalendarIcon from "@material-ui/icons/CalendarTodayOutlined";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  },
  posts: {
    background: "#fafafa",
    minHeight: "60vh",
  },
  mainContainer: {
    overflow: "auto",
    padding: "1.5em",
  },
  profile: {
    position: "relative",
    width: "100%",
    height: "35vh",
    minHeight: 230,
    maxHeight: 430,
    background: "#161829",
    borderRadius: "0.2em",
  },
  profileAvatar: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    bottom: 20,
    left: 50,
  },
  imageWrapper: {
    background: "#161829",
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "0.2em solid #161829",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "0.2em solid #161829",
    objectFit: "cover",
  },
  profileName: {
    marginLeft: 40,
    marginBottom: 30,
    color: "#fff",
    textShadow: "0 0 5px #333",
    fontWeight: 700,
    fontSize: 24,
  },
  profileNav: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    paddingLeft: "20em",
    width: "100%",
    height: 80,
    background: "#161829",
  },
  profileCover: {
    background: "#000",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#5a5d75",
    fontWeight: 700,
    fontSize: "1.1em",
    letterSpacing: 2,
  },
  timeline: {
    display: "flex",
    position: "relative",
    marginTop: "2em",
    width: "100%",
  },
  timelineLeft: {
    width: "22em",
    marginRight: "2em",
  },
  timelineRight: {
    flexGrow: 1,
  },
  infoBox: {
    background: "#161829",
    borderRadius: "0.2em",
    padding: "1.5em",
    color: "#a8abbf",
  },
  infoText: {
    display: "flex",
    alignItems: "center",
    margin: "0.5em 0",
  },
  marginIcon: {
    marginRight: "0.5em",
  },
});

class user extends Component {
  state = {
    profile: null,
    postIdParam: null,
    open: false,
    oldPath: "",
    newPath: "",
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
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const {
      classes,
      data: { loading, posts },
    } = this.props;
    const { postIdParam, profile } = this.state;

    const postsMarkup = loading ? (
      <PostSkeleton />
    ) : posts === null ? null : !postIdParam ? (
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
        <main className="main gradientbg">
          <Navbar />
          <section className={classes.mainContainer}>
            <div className={classes.profile}>
              <div className={classes.profileCover}></div>
              <div className={classes.profileAvatar}>
                {!profile ? (
                  <div className={classes.imageWrapper}></div>
                ) : (
                  <img
                    src={profile.imageUrl}
                    alt="Profile image"
                    className={classes.profileImage}
                  ></img>
                )}

                <div className={classes.profileName}>
                  {profile && profile.handle}
                </div>
              </div>
              <div className={classes.profileNav}>
                <a className="profileLink active">Timeline</a>
                <a className="profileLink">About</a>
                <a className="profileLink">Likes</a>
              </div>
            </div>
            <section className={classes.timeline}>
              <div className={classes.timelineLeft}>
                <div className={classes.infoBox}>
                  <div className={classes.title}>ABOUT</div>
                  <div className={classes.info}>
                    {profile && (
                      <Fragment>
                        {profile.bio && (
                          <div className={classes.infoText}>{profile.bio}</div>
                        )}
                        {profile.location && (
                          <div className={classes.infoText}>
                            <LocationIcon className={classes.marginIcon} />{" "}
                            <div>{profile.location}</div>
                          </div>
                        )}
                        {profile.website && (
                          <div className={classes.infoText}>
                            <LinkIcon className={classes.marginIcon} />
                            <a
                              href={profile.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {" "}
                              {profile.website}
                            </a>
                          </div>
                        )}
                        <div className={classes.infoText}>
                          {" "}
                          <CalendarIcon className={classes.marginIcon} />{" "}
                          <span>
                            Joined {dayjs(profile.createdAt).format("MMM YYYY")}
                          </span>
                        </div>
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
              <div className={classes.timelineRight}>
                <div className={classes.createPost}>
                  <CreatePost />
                </div>
                <div className={classes.listPosts}>{postsMarkup}</div>
              </div>
            </section>
          </section>
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
