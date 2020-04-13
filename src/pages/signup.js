import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI imports
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux imports
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

//icons
import PublicIcon from "@material-ui/icons/Public";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";

const styles = (theme) => ({
  ...theme.spread,
  coverContainer: {
    position: "absolute",
    margin: 0,
    padding: 0,
    height: "100%",
  },
  rightCover: {
    backgroundColor: "#fff",
    color: "#fff",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsCover: {
    "& a": {
      borderRadius: 20,
      margin: "10px 10px 10px 0",
      padding: "7px 25px",
      fontWeight: "bold",
      fontSize: 15,
    },
  },
  wrapperLeft: {
    width: 490,
    height: "auto",
    fontSize: "20pt",
    textAlign: "left",
    padding: 15,
  },
  wrapperRight: {
    maxWidth: "425px",
    height: "auto",
    fontSize: "17pt",
    textAlign: "left",
    padding: 15,
  },
  item: {
    margin: "20px 0",
    letterSpacing: "1px",
    fontSize: 25,
    textShadow: "0 7px 15px rgba(0,0,0,0.5)",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTop: "1px solid rgb(0,0,0,0.1)",
    height: 40,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 11,
    color: "rgb(0,0,0,0.3)",
    padding: "5px 0px",
    fontWeight: "bold",
    "& span": {
      margin: "0 7px",
    },
  },
  color: {
    color: theme.palette.primary.dark,
  },
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
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

    return (
      <Grid container spacing={0} className={classes.coverContainer}>
        <Grid item sm={6} xs={12} className="gradientbg leftCover">
          <div className={classes.wrapperLeft}>
            <Typography className={classes.brand}>Chatsy</Typography>
            <div className={classes.item}>
              <PublicIcon /> <span>Stay connected to the world</span>
            </div>
            <div className={classes.item}>
              <PeopleIcon /> <span>Meet others with similar interests</span>
            </div>
            <div className={classes.item}>
              <ChatIcon /> <span>Start the conversation</span>
            </div>
          </div>
        </Grid>
        <Grid item sm={6} xs={12} className={classes.rightCover}>
          <div className={classes.wrapperRight}>
            <Grid container className={classes.formWrapper}>
              <Grid item sm xs={12}>
                <Typography className={classes.pageTitle}>NEW USER?</Typography>
                <Typography className={classes.subTitle}>
                  Start the conversation.
                </Typography>
                <br />
                <form
                  noValidate
                  onSubmit={this.handleSubmit}
                  className={classes.form}
                >
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="handle"
                    name="handle"
                    type="text"
                    label="Handle"
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    helperText={errors.handle}
                    error={errors.handle ? true : false}
                    value={this.state.handle}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  {errors.general && (
                    <Typography variant="body2" className={classes.customError}>
                      {errors.general}
                    </Typography>
                  )}
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={loading}
                  >
                    SignUp
                    {loading && (
                      <CircularProgress
                        size={30}
                        className={classes.progress}
                      />
                    )}
                  </Button>

                  <div className={classes.or}>Already have an account?</div>
                  <Link to="/" className={classes.link}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={loading}
                      className={classes.button}
                    >
                      LOG IN
                    </Button>
                  </Link>
                </form>
              </Grid>
            </Grid>
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
          <span>© SA 2019</span>
        </div>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
