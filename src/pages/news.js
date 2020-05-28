import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Navbar from "../components/layout/Navbar";

import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spread,
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
  newsContainer: {
    width: '100%',
    borderTop: "1px solid #2b3052",
    borderBottom: "1px solid #2b3052",
    display: "flex",
    justifyContent: "space-between",
    padding: "1em",
    textAlign: 'left',
    transition: "0.3s",
    "&:hover": {
      background: '#1e2138',
      cursor: 'pointer',
      transition: "0.3s",
      '& $newstitle': {
        color: "#fff",
        transition: "0.3s",
      },
      '& $newsDesc': {
        color: "#a8abbf",
        transition: "0.3s",
      },
    }
  },
  newstitle: {
    color: "#a8abbf",
    fontSize: "0.9em",
    fontWeight: 'bold',
    transition: "0.3s"
  },
  newsDesc: {
    color: "#5a5d75",
    fontSize: "0.85em",
    float: 'left',
    transition: "0.3s",
  },
  newsImage: {
    width: 75,
    height: 75,
    borderRadius: "0.5em",
    background: "#a8abbf",
    alignItems: "right",
    flexShrink: 0,
    objectFit: 'cover',
    marginLeft: '1em'
  },
});

class news extends Component {
  state = {
  news: [],
};
  componentDidMount() {
    this.fetchNews();
  }
  fetchNews = () => {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=3d6ce58e27a549978161aaee19734fce'
    fetch(
      proxyUrl + targetUrl
    ).then((res) => {
      return res.json();
    }).then((data) => {
      this.setState({ news: data.articles });
    })
      .catch((err) => console.log(err));
  };
  render() {
    const { classes } = this.props;
    const { news } = this.state;

    const newsMarkup =
      news &&
      news.map((news, index) => (
        <a href={news.url} target="_blank" rel="noopener noreferrer" key={index} className={classes.newsContainer}>
          <div>
            <div className={classes.newstitle}>{news.title}</div>
            <div className={classes.newsDesc}>{news.description}</div>
          </div>
            {news.urlToImage ? (
              <img
                src={news.urlToImage}
                className={classes.newsImage}
                alt="news"
              ></img>
            ) : null}
        </a>
      ));

    return (
      <main className="main">
        <Navbar />
        <section className={classes.mainContainer} id="mainContainer">
          <Grid item className="feed">
            <Typography className={classes.sectionTitle}>
              Latest News
            </Typography>
            {newsMarkup}
          </Grid>{" "}
        </section>
      </main>
    );
  }
}

news.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(styles)(news));
