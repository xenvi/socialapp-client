import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Navbar from "../components/layout/Navbar";

import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import axios from 'axios'

const styles = (theme) => ({
  ...theme.spread,
  mainContainer: {
    overflow: "auto",
    textAlign: "center",
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
  followerContainer: {
    width: '100%',
    borderTop: "1px solid #2b3052",
    borderBottom: "1px solid #2b3052",
    padding: "0.5em 1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    transition: "0.3s",
    "&:hover": {
      background: '#1e2138',
      cursor: 'pointer',
      transition: "0.3s",
      '& $followerHandle': {
        color: "#fff",
        transition: "0.3s",
      },
    }
  },
  followerHandle: {
    color: "#a8abbf",
    transition: "0.3s",
  },
  followerImg: {
    borderRadius: "50%",
    width: '3.5em',
    height: '3.5em',
    objectFit: "cover",
    marginRight: "1em",
  },
});

class Followers extends Component {
    state = {
        followers: []
    }
  componentDidMount() {
    const handle = this.props.match.params.handle;
    axios
    .get(`/user/${handle}/followers`)
    .then((res) => {
        this.setState({
            followers: res.data
        })
    })
    .catch((err) => console.log(err));
  }
  render() {
    const { classes } = this.props;
    const { followers } = this.state;

    const followersMarkup =
      followers &&
      followers.map((follower, index) => (
        <Link to={`/users/${follower.handle}`} className={classes.followerContainer} key={index}>
            <img
              src={follower.imageUrl}
              className={classes.followerImg}
              alt={follower.handle}
            />
            <div 
              className={classes.followerHandle}
            >
              {follower.handle}
            </div>
          </Link>
      ));

    return (
      <main className="main">
        <Navbar />
        <section className={classes.mainContainer} id="mainContainer">
          <Grid item className="feed">
            <Typography className={classes.sectionTitle}>
              {this.props.match.params.handle && this.props.match.params.handle + "'s"} Followers
            </Typography>
            {followersMarkup}
          </Grid>{" "}
        </section>
      </main>
    );
  }
}

Followers.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Followers));
