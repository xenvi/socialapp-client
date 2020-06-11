import React, { Component, Fragment } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import Post from "../post/Post";
import CreateProfilePost from "../post/CreateProfilePost";

//icons
import LinkIcon from "@material-ui/icons/LanguageOutlined";
import LocationIcon from "@material-ui/icons/LocationOnOutlined";
import CalendarIcon from "@material-ui/icons/CalendarTodayOutlined";

const styles = (theme) => ({
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
      title: {
        color: "#5a5d75",
        fontWeight: 700,
        fontSize: "1.1em",
        letterSpacing: 2,
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
})

export class ProfileTimeline extends Component {
    render() {
        const {
            classes,
            loading,
            posts,
            profile: {
                handle,
                bio,
                location,
                website,
                followingCount,
                followersCount,
                createdAt
            },
            postIdParam
          } = this.props;

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
        return(
        <section className={classes.timeline} key={postIdParam}>
            <div className={classes.timelineLeft} id="timelineLeft">
              <div className={classes.infoBox}>
                <div className={classes.title}>ABOUT</div>
                <div className={classes.info}>
                    <Fragment>
                        {bio && <div className={classes.infoText}>{bio}</div>}
                      
                        {location && <div className={classes.infoText}>
                          <LocationIcon className={classes.marginIcon} />{" "}
                          <div>{location}</div>
                        </div>}
                        {website && <div className={classes.infoText}>
                          <LinkIcon className={classes.marginIcon} />
                          <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            {website}
                          </a>
                        </div>}
                      <div className={classes.infoText}>
                        {" "}
                        <CalendarIcon className={classes.marginIcon} />{" "}
                        <span>
                          Joined {dayjs(createdAt).format("MMM YYYY")}
                        </span>
                      </div>
                      
                        <div className={classes.profileFollows}>
                          <Link to={`/users/${handle}/following`} className={classes.profileFollowLink}>
                            {followingCount} Following
                          </Link>
                          <Link to={`/users/${handle}/followers`} className={classes.profileFollowLink}>
                            {followersCount} Followers
                          </Link>
                        </div>
                      
                    </Fragment>
                  
                </div>
              </div>
            </div>
            <div className={classes.timelineRight}>
              <div className={classes.createPost}>
                <CreateProfilePost
                  profileHandle={handle}
                />
              </div>
              <div className={classes.listPosts}>{postsMarkup}</div>
            </div>
          </section>)
    }
}

export default withStyles(styles)(ProfileTimeline)
  