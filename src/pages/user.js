import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import EditDetails from "../components/profile/EditDetails";
import ProfileTimeline from "../components/profile/ProfileTimeline";
import ProfileLikes from "../components/profile/ProfileLikes";
import CircularProgress from "@material-ui/core/CircularProgress";
import FollowButton from "../components/profile/FollowButton";

import { connect } from "react-redux";
import { getAnyUserData, unsetProfile } from "../redux/actions/userActions";
import { getProfilePosts } from "../redux/actions/dataActions";
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
    left: 20,
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
    padding: "5em 1em 1em 1em",
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
  profileFollows: {
    marginTop: 15,
  },
  profileFollowLink: {
    color: "#fff",
    marginRight: 20,
  },
  infoText: {
    display: "flex",
    alignItems: "center",
    margin: "0.5em 0",
  },
  marginIcon: {
    marginRight: "0.25em",
  },
  imageHiddenFiller: {
    width: 125,
    height: 125,
    borderRadius: "50%",
    border: "0.5em solid #161829",
    background: "#161829",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
});

class User extends Component {
  state = {
    postIdParam: null,
    openTimeline: true,
    openLikes: false
  };

  componentDidMount() {
    // component loaded
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });

    this.props.getAnyUserData(handle);
    this.props.getProfilePosts(handle);

    const profileLink = document.querySelectorAll("a.profileLink");
    const hiddenProfileLink = document.querySelectorAll("a.hiddenProfileLink");
    
    Array.from(profileLink).forEach(function(link, i) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var current = document.querySelectorAll("a.profileLink.active")[0];
        current.className = current.className.replace(" active", "");
        this.className += " active";
      });
    });
    Array.from(hiddenProfileLink).forEach(function(link, i) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var current = document.querySelectorAll("a.hiddenProfileLink.active")[0];
        current.className = current.className.replace(" active", "");
        this.className += " active";
      });
    });
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

    // if post params change, update state
    if (this.props.match.params.postId !== prevProps.match.params.postId) {
      const postId = this.props.match.params.postId;
      this.setState({ postIdParam: postId });
    }
    

  }
  componentWillUnmount() {
    this.props.unsetProfile();
  }

  openTimeline = (e) => {
    e.preventDefault();
    this.setState({
      openTimeline: true,
      openLikes: false
    })
  };
  openLikes = (e) => {
    e.preventDefault();
    this.setState({
      openTimeline: false,
      openLikes: true
    })
  };
  render() {
    const {
      classes,
      data: { loading, posts },
      user: {
        profile,
        credentials: { handle },
      },
    } = this.props;
    const { postIdParam, openLikes, openTimeline } = this.state;

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
              <a onClick={this.openTimeline} className="profileLink active">Timeline</a>
              <a onClick={this.openLikes} className="profileLink">Likes</a>
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
              {profile ? (
                <img
                  src={profile.imageUrl}
                  alt="Profile"
                  className={classes.profileHiddenImage}
                ></img>
              ) : (
                <div className={classes.imageHiddenFiller}>
                  <CircularProgress />
                </div>
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
              <a onClick={this.openTimeline} className="hiddenProfileLink active">Timeline</a>
              <a onClick={this.openLikes} className="hiddenProfileLink">Likes</a>
            </div>
          </div>
          {profile && openTimeline === true && <ProfileTimeline profile={profile} postIdParam={postIdParam} loading={loading} posts={posts} />}
          {profile && openLikes === true && <ProfileLikes handle={profile.handle} />}
        </section>
      </main>
    );
  }
}

User.propTypes = {
  getAnyUserData: PropTypes.func.isRequired,
  getProfilePosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});
const mapActionsToProps = {
  getAnyUserData,
  getProfilePosts,
  unsetProfile,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(User));
