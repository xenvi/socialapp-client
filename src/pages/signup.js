import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.ico";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

// MUI imports
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// redux imports
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.spread
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {}
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <Fragment>
        <Navbar />
        <Grid container className={classes.formWrapper}>
          <Grid item sm />
          <Grid item sm>
            <Card className={classes.card}>
              <CardContent>
                <img src={AppIcon} alt="icon" className={classes.image} />
                <Typography variant="h3" className={classes.pageTitle}>
                  SIGNUP
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
                  <br />
                  <div className={classes.or}>OR</div>
                  <small>
                    <Link to="/login" className={classes.link}>
                      LOG IN HERE
                    </Link>
                  </small>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm />
        </Grid>
      </Fragment>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
