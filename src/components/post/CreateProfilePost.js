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
    padding: "1.5em",
    background: "#161829",
    textAlign: "right",
    boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: "0.2em",
    borderBottom: "0.1em solid #222540",
  },
  profileImg: {
    width: "5em",
    height: "5em",
    borderRadius: "50%",
    objectFit: "cover",
  },
  formContent: {
    marginLeft: "1.5em",
    width: "90%",
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
    this.props.createPost({
      body: this.state.body,
      location: this.props.profileHandle,
    });
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

    var loadingtextShare = loading ? (
      <CircularProgress size={30} className={classes.progress} />
    ) : (
      "Share"
    );
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
              placeholder="Send a message ..."
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.postTextField}
              onChange={this.handleChange}
              InputProps={{
                disableUnderline: true,
                style: {
                  color: "#fff",
                },
              }}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.glowButton}
            >
              {loadingtextShare}
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
