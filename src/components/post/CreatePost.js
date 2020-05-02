import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// mui imports
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField } from "@material-ui/core";

// icon imports

// redux imports
import { connect } from "react-redux";
import { createPost, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spread,
  form: {
    padding: 20,
    background: "#fff",
    textAlign: "right",
    boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "flex-start",
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    objectFit: "cover",
  },
  formContent: {
    marginLeft: 15,
    width: "100%",
  },
});

class CreatePost extends Component {
  state = {
    body: "",
    errors: {},
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", errors: {} });
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createPost({ body: this.state.body });
    this.props.clearErrors();
    this.setState({ body: "", errors: {} });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
      user: {
        credentials: { imageUrl },
      },
    } = this.props;
    return (
      <Fragment>
        <div className={classes.form}>
          <img
            src={imageUrl}
            className={classes.profileImg}
            alt="User profile"
          />
          <form onSubmit={this.handleSubmit} className={classes.formContent}>
            <TextField
              name="body"
              type="text"
              value={this.state.body}
              multiline
              rows="2"
              placeholder="What's the latest?"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.posttextField}
              onChange={this.handleChange}
              InputProps={{ disableUnderline: true }}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Post
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </div>
      </Fragment>
    );
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { createPost, clearErrors })(
  withStyles(styles)(CreatePost)
);
