import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// mui importants
import Button from "@material-ui/core/Button";
import { InputBase } from "@material-ui/core";

import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    padding: "5px 10px",
    background: "#fff",
    textAlign: "right",
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  userImage: {
    objectFit: "cover",
    borderRadius: "50%",
    width: 60,
    height: 60,
  },
  formContent: {
    marginLeft: 15,
    width: "100%",
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
      <div className={classes.container}>
        <img src={imageUrl} alt="profile" className={classes.userImage} />
        <form onSubmit={this.handleSubmit} className={classes.formContent}>
          <InputBase
            name="body"
            type="text"
            placeholder="Add a comment ..."
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
            multiline
            minRow="2"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
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
