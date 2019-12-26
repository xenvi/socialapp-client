import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

// mui imports
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//icons
import PublicIcon from "@material-ui/icons/Public";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";

const styles = theme => ({
  ...theme.spread,
  coverContainer: {
    margin: 0,
    padding: 0,
    height: "100vh",
    marginTop: -90
  },
  leftCover: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  rightCover: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsCover: {
    "& a": {
      borderRadius: 20,
      margin: "10px 10px 10px 0",
      padding: "7px 25px",
      fontWeight: "bold",
      fontSize: 15
    }
  },
  wrapperLeft: {
    width: 330,
    height: 300,
    fontSize: "20pt",
    textAlign: "left"
  },
  wrapperRight: {
    width: 415,
    height: 180,
    fontSize: "18pt",
    textAlign: "left"
  },
  item: {
    margin: "20px 0"
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTop: "1px solid rgb(0,0,0,0.1)",
    height: 50,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 13,
    color: "rgb(0,0,0,0.3)",
    fontWeight: "bold",
    "& span": {
      margin: "0 15px"
    }
  },
  color: {
    color: theme.palette.primary.dark
  }
});

class cover extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={0} className={classes.coverContainer}>
        <Grid item xs={6} className={classes.leftCover}>
          <div className={classes.wrapperLeft}>
            <Typography variant="h3" className={classes.pageTitle}>
              The next big conversation begins with{" "}
              <span className={classes.color}>you</span>.
            </Typography>
            <Typography variant="body1" className={classes.subTitle}>
              Join SA today.
            </Typography>
            <div className={classes.buttonsCover}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.rightCover}>
          <div className={classes.wrapperRight}>
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

export default withStyles(styles)(cover);
