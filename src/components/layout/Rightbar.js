import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Notifications from "./Notifications";
import { getNewUsers } from "../../redux/actions/dataActions";
import Settings from "./Settings";

// redux imports
import { connect } from "react-redux";


const styles = (theme) => ({
  ...theme.spread,
  rightbar: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    background: "#161829",
    width: "19.5em",
    minHeight: "100vh",
    height: "100%",
    overflow: "auto",
    transform: "translateX(0)",
  },
  rightNav: {
    display: "flex",
    alignItems: "center",
    padding: "1em 2em",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    margin: "0 0 0 10px",
    objectFit: "cover",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    color: "#a8abbf",
  },
  menuContainer: {
    width: "100%",
    overflow: "auto",
    padding: "1em 2em",
  },
  submenu: {
    paddingBottom: "2em",
  },
  menuTitle: {
    color: "#5a5d75",
    fontWeight: 700,
    fontSize: "1.1em",
    letterSpacing: 2,
  },
  menuList: {
    "& ul": {
      listStyle: "none",
      paddingInlineStart: 0,
      "& li": {
        display: "flex",
        alignItems: "center",
        color: "#a8abbf",
        cursor: "pointer",
        padding: "0.5em 0",
        transition: "0.3s all ease-in-out",
        "&:hover, &:active": {
          color: "#fff",
          transition: "0.3s all ease-in-out",
        },
      },
    },
  },
  newuserContainer: {
    width: "100%",
    margin: "1em 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  newuserImg: {
    width: "3em",
    height: "3em",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "1em",
  },
  newuserHandle: {
    color: "#a8abbf",
    transition: "0.3s all ease-in-out",
    "&:hover": {
      color: "#fff",
      transition: "0.3s all ease-in-out",
    },
  },
  fillerImage: {
    width: "3em",
    height: "3em",
    borderRadius: "50%",
    marginRight: "1em",
    background: "#5a5d75",
  },
  news: {
    width: "100%",
    height: "auto",
    background: "#1d2038",
    borderRadius: "0.5em",
    marginTop: "0.5em",
    overflow: "hidden",
  },
  newsContainer: {
    borderTop: "1px solid #2b3052",
    borderBottom: "1px solid #2b3052",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5em 1em",
    transition: "0.3s",
    "&:hover": {
      background: '#292d49',
      cursor: 'pointer',
      transition: "0.3s",
      '& $newstitle': {
        color: "#fff",
        transition: "0.3s",
      }
    }
  },
  newstitle: {
    color: "#a8abbf",
    fontSize: "0.85em",
    transition: "0.3s"
  },
  newsImage: {
    width: 50,
    height: 50,
    borderRadius: "0.5em",
    background: "#a8abbf",
    alignItems: "right",
    flexShrink: 0,
    objectFit: 'cover',
    marginLeft: '1em'
  },
});

export class Rightbar extends Component {
  state = {
    news: [],
  };
  componentDidMount() {
    this.props.getNewUsers();
    this.fetchNews();
  }
  fetchNews = () => {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=3d6ce58e27a549978161aaee19734fce'
    fetch(
      proxyUrl + targetUrl
    )
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({ news: data.articles });
      })
      .catch((err) => console.log(err));
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, imageUrl },
      },
      data: { newusers },
      UI: { loading },
    } = this.props;
    const { news } = this.state;

    const users = !loading
      ? newusers.map((user, index) => (
          <div className={classes.newuserContainer} key={index}>
            <img
              src={user.imageUrl}
              className={classes.newuserImg}
              alt="New users"
            />
            <Link
              to={`/users/${user.handle}`}
              className={classes.newuserHandle}
            >
              {user.handle}
            </Link>
          </div>
        ))
      : Array.from({ length: 4 }).map((item, index) => (
          <div className={classes.newuserContainer} key={index}>
            <div className={classes.fillerImage} />
          </div>
        ));

    const newsMarkup =
      news &&
      news.map((news, index) => (
        <a href={news.url} target="_blank" rel="noopener noreferrer" className={classes.newsContainer} key={index}>
            <div className={classes.newstitle}>{news.title}</div>
         
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
      <aside className={classes.rightbar} id="rightbar">
        <div className={classes.rightNav}>
          <Link to={`/users/${handle}`} className={classes.profileLink}>
            {handle}
            <img src={imageUrl} alt="profile" className={classes.image} />
          </Link>
          <Notifications />
          <Settings />
        </div>
        <div className={classes.menuContainer} id="mainContainer">
          <div className={classes.submenu}>
            <div className={classes.menuTitle}>MEET NEW PEOPLE</div>
            <div className={classes.menuList}>{users}</div>
          </div>
          <div className={classes.submenu}>
            <div className={classes.menuTitle}>TRENDING NEWS</div>
            <div className={classes.news}>{newsMarkup}</div>
          </div>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

Rightbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getNewUsers })(
  withStyles(styles)(Rightbar)
);
