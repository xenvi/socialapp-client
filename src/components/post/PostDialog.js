import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

//MUI imports
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";

//icons
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/CommentOutlined";

//redux
import { connect } from "react-redux";
import { getPost, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spread,
  profileImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    position: "relative",
    background: "#161829",
  },
  closeButton: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  expandButton: {
    position: "absolute",
    right: 5,
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  centerItem: {
    textAlign: "center",
  },
  container: {
    padding: "2em 0",
  },
  postDetails: {
    color: "#a8abbf",
    paddingLeft: "1em",
  },
  handle: {
    fontSize: 18,
    color: theme.palette.primary.light,
  },
  wrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "1em 0",
    color: "#a8abbf",
  },
  cardWrapperIndent: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    padding: "1em 2em",
  },
  openDialog: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
});

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  componentDidMount() {
    if (this.props.openDialog) this.handleOpen();
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, postId, profileHandle } = this.props;
    const newPath = `/users/${userHandle}/post/${postId}`;
    const profilePath = `/users/${profileHandle}/post/${postId}`;

    if (oldPath === newPath || oldPath === profilePath) oldPath = `/users/${profileHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.postId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userHandle,
        userImage,
        comments,
      },

      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <div className={classes.wrapper}>
        <div className={classes.cardWrapperIndent} id="cardWrapperIndent">
          <div className={classes.centerItem}>
            <img
              src={userImage}
              alt="Profile"
              className={classes.profileImage}
            />
          </div>
          <div className={classes.postDetails} id="postDetails">
            <Link to={`/users/${userHandle}`} className={classes.handle}>
              {userHandle}
            </Link>
            <div className={classes.date}>
              {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
            </div>
            <hr className={classes.invisibleSeparator} />
            <div>{body}</div>
          </div>
        </div>
        <hr className={classes.thickSeparator} />
        <div className={classes.wrap}>
          <LikeButton postId={postId} />
          <span className={classes.rightSpace}>{likeCount}</span>
          <ChatIcon className={classes.wrapIcon} />
          <span>{commentCount}</span>
        </div>
        <hr className={classes.thickSeparator} />

        <Comments comments={comments} />

        <hr className={classes.thickSeparator} />
        <CommentForm postId={postId} />
      </div>
    );
    return (
      <Fragment>
        <div className={classes.openDialog} onClick={this.handleOpen}></div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            style: {
              backgroundColor: "transparent",
            },
          }}
        >
          <div className={classes.dialogContent}>{dialogMarkup}</div>
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon color="secondary" />
          </MyButton>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

export default connect(mapStateToProps, { getPost, clearErrors })(
  withStyles(styles)(PostDialog)
);
