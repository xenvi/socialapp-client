import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

// mui imports
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux
import { connect } from "react-redux";
import { loginUser, signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spread,
  buttonsCover: {
    "& a": {
      borderRadius: 20,
      margin: "10px 10px 10px 0",
      padding: "7px 25px",
      fontWeight: "bold",
      fontSize: 15,
    },
  },
  item: {
    margin: "20px 0",
    letterSpacing: "1px",
    fontSize: 23,
    textShadow: "0 7px 15px rgba(0,0,0,0.5)",
  },

  color: {
    color: theme.palette.primary.dark,
  },
  loginFormWrapper: {
    marginTop: 30,
  },
  signupFormWrapper: {
    maxWidth: 350,
    textAlign: "center",
    margin: "15% auto 0 auto",
  },
});

class cover extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      handle: "",
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
      errors: {},
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  checkFormId = (e, id) => {
    e.preventDefault();
    if (id === "loginForm") {
      this.handleLoginSubmit();
    }
    if (id === "signupForm") {
      this.handleSignupSubmit();
    }
  };
  handleLoginSubmit = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  };
  handleSignupSubmit = () => {
    const newUserData = {
      newEmail: this.state.newEmail,
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    var loadingTextLogin = loading ? (
      <CircularProgress size={30} className={classes.progress} />
    ) : (
      "LOGIN"
    );
    var loadingTextSignup = loading ? (
      <CircularProgress size={30} className={classes.progress} />
    ) : (
      "SIGNUP"
    );
    return (
      <Grid container spacing={0} className="gradientbg">
        <Grid item xs={12} className="coverContainer">
          {" "}
          <Typography className={classes.brand} id="title">
            Chatsy
          </Typography>
          <Typography className="smalltitle">
            Connect. Share. Express.
          </Typography>
          <div className="formWrapper">
            <div className="login-signup-title">
              <span className="login-title">Log In</span>{" "}
              <span className="signup-title translucent">Sign Up</span>
            </div>
            <div id="loginContainer">
              <form
                noValidate
                onSubmit={this.handleLoginSubmit}
                id="loginForm"
                className="is-visible"
              >
                <span className={classes.labels}>Email</span>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  className={classes.textField}
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  value={this.state.email}
                  onChange={this.handleChange}
                  InputProps={{ disableUnderline: true }}
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
                <br />
                <span className={classes.labels}>Password</span>
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  className={classes.textField}
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  value={this.state.password}
                  onChange={this.handleChange}
                  InputProps={{ disableUnderline: true }}
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
                {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}

                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  onClick={(e) => this.checkFormId(e, "loginForm")}
                >
                  {loadingTextLogin}
                </Button>
              </form>

              <form
                noValidate
                onSubmit={this.handleSignupSubmit}
                id="signupForm"
              >
                <span className={classes.labels}>Handle</span>
                <TextField
                  id="handle"
                  type="text"
                  name="handle"
                  className={classes.textField}
                  helperText={errors.handle}
                  error={errors.handle ? true : false}
                  value={this.state.handle}
                  onChange={this.handleChange}
                  InputProps={{ disableUnderline: true }}
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
                <br />
                <span className={classes.labels}>Email</span>
                <TextField
                  id="newEmail"
                  type="email"
                  name="newEmail"
                  className={classes.textField}
                  helperText={errors.newEmail}
                  error={errors.newEmail ? true : false}
                  value={this.state.newEmail}
                  onChange={this.handleChange}
                  InputProps={{ disableUnderline: true }}
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
                <br />

                <span className={classes.labels}>Password</span>
                <TextField
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  className={classes.textField}
                  helperText={errors.newPassword}
                  error={errors.newPassword ? true : false}
                  value={this.state.newPassword}
                  onChange={this.handleChange}
                  InputProps={{ disableUnderline: true }}
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
                <br />

                <span className={classes.labels}>Confirm Password</span>
                <TextField
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  className={classes.textField}
                  helperText={errors.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  InputProps={{ disableUnderline: true }}
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
                <br />
                {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}

                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                  onClick={(e) => this.checkFormId(e, "signupForm")}
                >
                  {loadingTextSignup}
                </Button>
              </form>
            </div>
          </div>
        </Grid>
        <div className={classes.bottomNav}>
          <span>ABOUT</span>
          <span>SUPPORT</span>
          <span>PRIVACY POLICY</span>
          <span>TERMS</span>
          <span>DEVELOPMENT</span>
          <span>API</span>
          <span>JOBS</span>
          <span>© CHATSY 2019</span>
        </div>
      </Grid>
    );
  }
}

cover.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(cover));
