import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// redux imports
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

// mui imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

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
    marginTop: "1.5em",
  },
  whiteText: {
    color: "#a8abbf",
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
    open: false,
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
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

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <button className={classes.followEditbtn} onClick={this.handleOpen}>
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
            <DialogContent className={classes.formContainer}>
              <form>
                {" "}
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
            </DialogContent>
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
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
