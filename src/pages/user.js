import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Leftbar from "../components/layout/Leftbar";
import Rightbar from "../components/layout/Rightbar";
import Post from "../components/post/Post";
import CreatePost from "../components/post/CreatePost";
import PostSkeleton from "../util/PostSkeleton";
import EditDetails from "../components/profile/EditDetails";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import { getAnyUserData, followUser } from "../redux/actions/userActions";
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
    transition: "0.3s",
  },
  profileAvatar: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 30,
  },
  profileImage: {
    width: 175,
    height: 175,
    borderRadius: "50%",
    border: "0.5em solid #161829",
    objectFit: "cover",
    zIndex: 1,
  },
  profileName: {
    marginLeft: 40,
    marginBottom: 30,
    color: "#fff",
    textShadow: "0 0 5px #000",
    fontWeight: 700,
    fontSize: 24,
  },
  profileNav: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    paddingLeft: "14.5em",
    width: "100%",
    height: 70,
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
    marginRight: "1em",
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
  profileFollows: {
    marginLeft: 40,
    marginBottom: 26,
  },
  profileFollowLink: {
    color: "#fff",
    marginRight: 20,
  },
  loadingCircle: {
    textAlign: "center",
    padding: "2em 0",
    color: "#a8abbf",
  },
  profileHidden: {
    display: "none",
    position: "relative",
    width: "100%",
    height: "auto",
    minHeight: 230,
    background: "#161829",
    borderRadius: "0.2em",
    transition: "0.3s",
  },

  profileHiddenAvatar: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: 120,
    left: 30,
  },
  profileHiddenImage: {
    width: 125,
    height: 125,
    borderRadius: "50%",
    border: "0.5em solid #161829",
    objectFit: "cover",
    zIndex: 1,
  },
  profileHiddenInfo: {
    position: "relative",
    width: "100%",
    height: "auto",
    background: "#161829",
    padding: "4em 1em 1em 1em",
  },
  profileHiddenNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    background: "#161829",
  },
  profileHiddenCover: {
    background: "#000",
    width: "100%",
    height: "12em",
  },
  profileHiddenButton: {
    position: "absolute",
    top: "1em",
    right: 0,
  },
  hiddenInfo: {
    color: "#a8abbf",
    padding: "1em 0",
  },
  profileHiddenFollows: {
    margin: "0",
  },
  profileHiddenName: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 21,
  },
});

class user extends Component {
  state = {
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

    this.props.getAnyUserData(handle);
    this.props.getUserData(handle);
  }
  componentDidUpdate(prevProps) {
    // if handle params changes, update profile
    if (this.props.match.params.handle !== prevProps.match.params.handle) {
      const handle = this.props.match.params.handle;

      this.props.getAnyUserData(handle);
      this.props.getUserData(handle);
    }
  }
  render() {
    const {
      classes,
      data: { loading, posts },
      user: {
        profile,
        credentials: { handle },
      },
    } = this.props;
    const { postIdParam } = this.state;

    const postsMarkup = loading ? (
      <div className={classes.loadingCircle}>Loading posts ...</div>
    ) : posts === null ? null : !postIdParam ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      posts.map((post) => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />;
        else return <Post key={post.postId} post={post} openDialog />;
      })
    );

    const followEditBtn =
      this.props.match.params.handle === handle ? (
        <EditDetails />
      ) : (
        <button
          className={classes.followEditbtn}
          onClick={() => this.props.followUser(profile.handle)}
        >
          Follow
        </button>
      );

    return (
      <div className={classes.container}>
        <Leftbar />
        <main className="main gradientbg">
          <Navbar />
          <section className={classes.mainContainer}>
            <div className={classes.profile} id="profile">
              <div className={classes.profileCover}></div>
              <div className={classes.profileAvatar}>
                {profile && (
                  <img
                    src={profile.imageUrl}
                    alt="Profile image"
                    className={classes.profileImage}
                  ></img>
                )}

                <div className={classes.profileName}>
                  {profile && profile.handle}
                </div>

                {profile && (
                  <div className={classes.profileFollows}>
                    <Link to="" className={classes.profileFollowLink}>
                      {profile.followingCount} Following
                    </Link>
                    <Link to="" className={classes.profileFollowLink}>
                      {profile.followersCount} Followers
                    </Link>
                  </div>
                )}
              </div>
              <div className={classes.profileNav}>
                <a className="profileLink active">Timeline</a>
                <a className="profileLink">About</a>
                <a className="profileLink">Likes</a>
                {followEditBtn}
              </div>
            </div>
            <div className={classes.profileHidden} id="profileHidden">
              <div className={classes.profileHiddenCover}></div>
              <div className={classes.profileHiddenAvatar}>
                {profile && (
                  <img
                    src={profile.imageUrl}
                    alt="Profile image"
                    className={classes.profileHiddenImage}
                  ></img>
                )}
              </div>
              <div className={classes.profileHiddenInfo}>
                <div className={classes.profileHiddenButton}>
                  {followEditBtn}
                </div>
                <div className={classes.profileHiddenName}>
                  {profile && profile.handle}
                </div>
                <div className={classes.hiddenInfo}>
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
                {profile && (
                  <div className={classes.profileHiddenFollows}>
                    <Link to="" className={classes.profileFollowLink}>
                      {profile.followingCount} Following
                    </Link>
                    <Link to="" className={classes.profileFollowLink}>
                      {profile.followersCount} Followers
                    </Link>
                  </div>
                )}
              </div>
              <hr className={classes.thickSeparator} />
              <div className={classes.profileHiddenNav}>
                <a className="profileLink active">Timeline</a>
                <a className="profileLink">About</a>
                <a className="profileLink">Likes</a>
              </div>
            </div>
            <section className={classes.timeline}>
              <div className={classes.timelineLeft} id="timelineLeft">
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
  getAnyUserData: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});
const mapActionsToProps = {
  getUserData,
  getAnyUserData,
  followUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(user));
