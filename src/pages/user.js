import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Post from "../components/post/Post";
import CreateProfilePost from "../components/post/CreateProfilePost";
import EditDetails from "../components/profile/EditDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import FollowButton from "../components/profile/FollowButton";

import { connect } from "react-redux";
import { getProfilePosts } from "../redux/actions/dataActions";
import { getAnyUserData, unsetProfile } from "../redux/actions/userActions";
//icons
import LinkIcon from "@material-ui/icons/LanguageOutlined";
import LocationIcon from "@material-ui/icons/LocationOnOutlined";
import CalendarIcon from "@material-ui/icons/CalendarTodayOutlined";

const styles = (theme) => ({
  ...theme.spread,
  posts: {
    background: "#fafafa",
    minHeight: "60vh",
  },
  mainContainer: {
    overflow: "auto",
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
  imageFiller: {
    width: 175,
    height: 175,
    borderRadius: "50%",
    border: "0.5em solid #161829",
    background: "#161829",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    textShadow: "0 0 10px #000",
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
    borderBottom: "0.1em solid #222540",
  },
  profileCover: {
    background: "#000",
    width: "100%",
    height: "100%",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: "0.8",
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
    width: "100%",
  },
  timelineLeft: {
    width: "18.5em",
  },
  timelineRight: {
    flexGrow: 1,
    minHeight: "58vh",
    borderLeft: "0.1em solid #222540",
  },
  infoBox: {
    borderRadius: "0.2em",
    padding: "1em",
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
    marginTop: 15,
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
    borderBottom: "0.1em solid #222540",
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
    this.props.getProfilePosts(handle);
  }
  componentDidUpdate(prevProps) {
    // if handle params changes, update profile
    if (this.props.match.params.handle !== prevProps.match.params.handle) {
      this.props.unsetProfile();
      const handle = this.props.match.params.handle;

      this.props.getAnyUserData(handle);
      this.props.getProfilePosts(handle);
    }

    // if authenticated user details update, update profile
    if (
      this.props.user.credentials !== prevProps.user.credentials &&
      this.props.user.credentials.followersCount ===
        prevProps.user.credentials.followersCount &&
      this.props.user.credentials.followingCount ===
        prevProps.user.credentials.followingCount
    ) {
      this.props.getAnyUserData(this.props.user.credentials.handle);
    }
  }
  componentWillUnmount() {
    this.props.unsetProfile();
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

    // filter posts by createdAt
    const orderedPosts = posts.sort(function (a, b) {
      var c = new Date(a.createdAt);
      var d = new Date(b.createdAt);
      return d - c;
    });

    const postsMarkup = loading ? (
      <div className={classes.loadingCircle}>Loading posts ...</div>
    ) : posts.length === 0 ? (
      <div className={classes.loadingCircle}>This user has no posts.</div>
    ) : !postIdParam ? (
      orderedPosts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      orderedPosts.map((post) => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />;
        else return <Post key={post.postId} post={post} openDialog />;
      })
    );

    const followEditBtn =
      this.props.match.params.handle === handle ? (
        <EditDetails />
      ) : (
        <FollowButton profileHandle={this.props.match.params.handle} />
      );

    return (
      <main className="main">
        <Navbar />
        <section className={classes.mainContainer} id="mainContainer">
          <div className={classes.profile} id="profile">
            <div className={classes.profileCover}>
              {profile && profile.headerUrl !== "" ? (
                <img
                  src={profile.headerUrl}
                  alt="Header"
                  className={classes.headerImage}
                ></img>
              ) : null}
            </div>
            <div className={classes.profileAvatar}>
              {profile ? (
                <img
                  src={profile.imageUrl}
                  alt="Profile"
                  className={classes.profileImage}
                ></img>
              ) : (
                <div className={classes.imageFiller}>
                  <CircularProgress />
                </div>
              )}

              <div className={classes.profileName}>
                {profile && profile.handle}
              </div>
            </div>
            <div className={classes.profileNav}>
              <a className="profileLink active">Timeline</a>
              <a className="profileLink">About</a>
              <a className="profileLink">Likes</a>
              {followEditBtn}
            </div>
          </div>
          <div className={classes.profileHidden} id="profileHidden">
            <div className={classes.profileHiddenCover}>
              {" "}
              {profile && profile.headerUrl !== "" ? (
                <img
                  src={profile.headerUrl}
                  alt="Header"
                  className={classes.headerImage}
                ></img>
              ) : null}
            </div>
            <div className={classes.profileHiddenAvatar}>
              {profile && (
                <img
                  src={profile.imageUrl}
                  alt="Profile"
                  className={classes.profileHiddenImage}
                ></img>
              )}
            </div>
            <div className={classes.profileHiddenInfo}>
              <div className={classes.profileHiddenButton}>{followEditBtn}</div>
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
                  <Link to={`/users/${profile.handle}/following`} className={classes.profileFollowLink}>
                    {profile.followingCount} Following
                  </Link>
                  <Link to={`/users/${profile.handle}/followers`} className={classes.profileFollowLink}>
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
                      {profile && (
                        <div className={classes.profileFollows}>
                          <Link to={`/users/${profile.handle}/following`} className={classes.profileFollowLink}>
                            {profile.followingCount} Following
                          </Link>
                          <Link to={`/users/${profile.handle}/followers`} className={classes.profileFollowLink}>
                            {profile.followersCount} Followers
                          </Link>
                        </div>
                      )}
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
            <div className={classes.timelineRight}>
              <div className={classes.createPost}>
                <CreateProfilePost
                  profileHandle={this.props.match.params.handle}
                />
              </div>
              <div className={classes.listPosts}>{postsMarkup}</div>
            </div>
          </section>
        </section>
      </main>
    );
  }
}

user.propTypes = {
  getProfilePosts: PropTypes.func.isRequired,
  getAnyUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});
const mapActionsToProps = {
  getProfilePosts,
  getAnyUserData,
  unsetProfile,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(user));
