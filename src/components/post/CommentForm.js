import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// mui importants
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    padding: "1em 2em",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  userImage: {
    objectFit: "cover",
    borderRadius: "50%",
    width: 50,
    height: 50,
  },
  formContent: {
    marginLeft: "1em",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
});

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitComment(this.props.postId, { body: this.state.body });

    this.setState({ body: "", errors: {} });
  };

  render() {
    const {
      classes,
      authenticated,
      user: {
        credentials: { imageUrl },
      },
    } = this.props;
    const errors = this.state.errors;

    const commentFormMarkup = authenticated ? (
      <div className={classes.container} id="commentformContainer">
        <img src={imageUrl} alt="profile" className={classes.userImage} />
        <form onSubmit={this.handleSubmit} className={classes.formContent}>
          <TextField
            name="body"
            type="text"
            placeholder="Add a comment ..."
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            className={classes.postTextField}
            multiline
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                color: "#fff",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.glowButton}
          >
            Post
          </Button>
        </form>
      </div>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  user: state.user,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
