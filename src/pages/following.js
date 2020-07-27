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
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 2,
    textAlign: "left",
    padding: "0.2em 0.2em 0.2em 0.5em",
    borderBottom: "0.1em solid #222540",
  },
  mainContainer: {
    overflow: "auto",
    textAlign: "center",
  },
  followingContainer: {
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
      '& $followingHandle': {
        color: "#fff",
        transition: "0.3s",
      },
    }
  },
  followingHandle: {
    color: "#a8abbf",
    transition: "0.3s",
  },
  followingImg: {
    borderRadius: "50%",
    width: '3.5em',
    height: '3.5em',
    objectFit: "cover",
    marginRight: "1em",
  },
});

class Following extends Component {
    state = {
        following: []
    }
  componentDidMount() {
    const handle = this.props.match.params.handle;
    axios
    .get(`/user/${handle}/following`)
    .then((res) => {
        this.setState({
            following: res.data
        })
    })
    .catch((err) => console.log(err));
  }
  render() {
    const { classes } = this.props;
    const { following } = this.state;

    const followingMarkup =
      following &&
      following.map((following, index) => (
        <Link to={`/users/${following.handle}`} className={classes.followingContainer} key={index}>
            <img
              src={following.imageUrl}
              className={classes.followingImg}
              alt={following.handle}
            />
              <div className={classes.followingHandle}>{following.handle}</div>
            </Link>
      ));

    return (
      <main className="main">
        <Navbar />
        <section className={classes.mainContainer} id="mainContainer">
          <Grid item className="feed">
            <Typography className={classes.sectionTitle}>
              {this.props.match.params.handle && this.props.match.params.handle + "'s"} Following
            </Typography>
            {followingMarkup}
          </Grid>{" "}
        </section>
      </main>
    );
  }
}

Following.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Following));
