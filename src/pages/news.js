import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Navbar from "../components/layout/Navbar";
import Leftbar from "../components/layout/Leftbar";
import Rightbar from "../components/layout/Rightbar";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spread,
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  },
  posts: {
    background: "#fafafa",
    minHeight: "60vh",
  },
  mainContainer: {
    overflow: "auto",
    textAlign: "center",
  },
  body: {
    background: "#fafafa",
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  profileImg: {
    width: 55,
    height: 55,
    borderRadius: "50%",
    objectFit: "cover",
  },
  handle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 2,
    textAlign: "left",
    padding: "0.2em 0.2em 0.2em 0.5em",
    borderBottom: "0.1em solid #222540",
  },
  copyright: {
    background: "#fff",
    width: "auto",
    boxShadow: "0 0px 3px rgba(0,0,0,0.2)",
    padding: 15,
    fontSize: 11,
    marginTop: "2em",
    lineHeight: "200%",
  },
  bottomNav: {
    color: "#333",
  },
});

class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Leftbar />
        <main className="main">
          <Navbar />
          <section className={classes.mainContainer} id="mainContainer">
            <Grid item className="feed">
              <Typography className={classes.sectionTitle}>
                Latest News
              </Typography>
            </Grid>{" "}
          </section>
        </main>
        <Rightbar />
      </div>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { getPosts })(withStyles(styles)(home));
