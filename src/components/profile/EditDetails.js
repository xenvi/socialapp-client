import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// redux imports
import { connect } from "react-redux";
import {
  editUserDetails,
  uploadImage,
  uploadHeaderImage,
} from "../../redux/actions/userActions";

// mui imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

//icons
import CameraIcon from "@material-ui/icons/CameraAltOutlined";

const styles = (theme) => ({
  ...theme.spread,
  detailsTitle: {
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: "1px",
    padding: "0.75em",
    fontSize: 21,
  },
  detailsContainer: {
    background: "#161829",
    color: "#fff",
  },
  formContainer: {
    textAlign: "center",
  },
  whiteText: {
    color: "#a8abbf",
  },
  editImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  editImageIcon: {
    width: "100%",
    height: "100%",
    position: "absolute",
    background: "rgba(0,0,0,0.2)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "0.3s",
    "&:hover": {
      background: "rgba(0,0,0,0.35)",
      transition: "0.3s",
    },
  },
  imageContainer: {
    zIndex: 1,
    width: 150,
    height: 150,
    position: "relative",
    border: "0.5em solid #161829",
    cursor: "pointer",
    margin: "-6em 0 1.5em 1.5em",
    borderRadius: "50%",
    overflow: "hidden",
  },
  headerContainer: {
    width: "100%",
    height: 200,
    position: "relative",
    cursor: "pointer",
  },
  headerFiller: {
    width: "100%",
    height: "100%",
    background: "#000",
  },
  editbtn: {
    margin: "0 1em 0 auto",
    fontSize: 15,
    textShadow: "0 3px 5px rgba(0,0,0,0.5)",
    border: "2px solid #0099ff",
    background: "none",
    color: "#0099ff",
    height: 40,
    borderRadius: "5px",
    fontWeight: "bold",
    width: "8em",
    cursor: "pointer",
    textTransform: "none",
    transition: "0.3s all ease-in-out",
    "&:hover": {
      color: "#00ccff",
      border: "2px solid #00ccff",
      transition: "0.3 all ease-in-out",
    },
    "&:active, &:focus": {
      outline: "none",
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    imageUrl: "",
    headerUrl: "",
    open: false,
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  componentDidUpdate(prevProps) {
    if (this.props.credentials !== prevProps.credentials) {
      const { credentials } = this.props;
      this.mapUserDetailsToState(credentials);
    }
  }

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
      imageUrl: credentials.imageUrl ? credentials.imageUrl : "",
      headerUrl: credentials.headerUrl ? credentials.headerUrl : "",
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);

    this.handleClose();
  };
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleHeaderChange = (event) => {
    const header = event.target.files[0];
    const formData = new FormData();
    formData.append("image", header, header.name);
    this.props.uploadHeaderImage(formData);
  };
  handleEditHeader = () => {
    const fileInput = document.getElementById("headerInput");
    fileInput.click();
  };

  render() {
    const { classes, UI: { errors } } = this.props;
    return (
      <Fragment>
        <button className={classes.editbtn} onClick={this.handleOpen}>
          Edit Profile
        </button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            style: {
              backgroundColor: "transparent",
            },
          }}
        >
          <div className={classes.detailsContainer}>
            <div className={classes.detailsTitle}>Edit Profile</div>
            <hr className={classes.thickSeparator} />
            <div className={classes.formContainer}>
              <input
                type="file"
                id="headerInput"
                hidden="hidden"
                onChange={this.handleHeaderChange}
              />
              <div
                onClick={this.handleEditHeader}
                className={classes.headerContainer}
              >
                <div className={classes.editImageIcon}>
                  <CameraIcon />
                </div>
                {this.state.headerUrl ? (
                  <img
                    src={this.state.headerUrl}
                    className={classes.editImage}
                    alt="Header"
                  />
                ) : (
                  <div className={classes.headerFiller} />
                )}
              </div>

              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <div
                onClick={this.handleEditPicture}
                className={classes.imageContainer}
              >
                <div className={classes.editImageIcon}>
                  <CameraIcon />
                </div>
                <img
                  src={this.state.imageUrl}
                  className={classes.editImage}
                  alt="Profile"
                />
              </div>

              <form>
                {" "}
                {errors && (
                  <div className={classes.customError}>
                    {errors.error}
                  </div>
                )}

                <span className={classes.labelsDark}>Bio</span>
                <TextField
                  id="bio"
                  type="text"
                  name="bio"
                  multiline
                  rows="3"
                  className={classes.textField}
                  value={this.state.bio}
                  onChange={this.handleChange}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.whiteText,
                  }}
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
                <br />
                <span className={classes.labelsDark}>Website</span>
                <TextField
                  id="website"
                  type="text"
                  name="website"
                  className={classes.textField}
                  value={this.state.website}
                  onChange={this.handleChange}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.whiteText,
                  }}
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
                <br />
                <span className={classes.labelsDark}>Location</span>
                <TextField
                  id="location"
                  type="text"
                  name="location"
                  className={classes.textField}
                  value={this.state.location}
                  onChange={this.handleChange}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.whiteText,
                  }}
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
              </form>
            </div>
            <hr className={classes.thickSeparator} />
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Save
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploadHeaderImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
});

export default connect(mapStateToProps, {
  editUserDetails,
  uploadImage,
  uploadHeaderImage,
})(withStyles(styles)(EditDetails));
