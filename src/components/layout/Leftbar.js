import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MaterialUI imports
import { Typography } from "@material-ui/core";

// redux imports
import { connect } from "react-redux";

// icons
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import PeopleIcon from "@material-ui/icons/PersonOutline";
import NewsIcon from "@material-ui/icons/MapOutlined";

const styles = (theme) => ({
  ...theme.spread,
  leftbar: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    background: "#161829",
    minWidth: "14em",
    height: "100%",
    borderRight: "0.1em solid #222540",
    transition: "0.3s",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    padding: "1em 2em",
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
      "& li a": {
        color: "#a8abbf",
        display: "flex",
        alignItems: "center",
        padding: "0.5em 0",
        cursor: "pointer",
        transition: "0.3s all ease-in-out",
        "&:hover, &:active": {
          color: "#fff",
          transition: "0.3s all ease-in-out",
        },
      },
    },
  },
  menuIcon: {
    marginRight: "0.5em",
  },
  copyright: {
    position: "absolute",
    bottom: 0,
    padding: "2em",
    color: "#a8abbf",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    fontSize: "0.8em",
    letterSpacing: 2,
  },
  leftbarHidden: {
    position: "relative",
    display: "none",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    background: "#161829",
    minWidth: "2em",
    height: "100%",
    borderRight: "0.1em solid #222540",
    transition: "0.3s",
  },
  hiddenIcon: {
    marginBottom: "1em",
    fontSize: 25,
  },
  hiddenBrand: {
    display: "flex",
    alignItems: "center",
    padding: "1em",
  },
});

export class Leftbar extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle },
      },
    } = this.props;

    return (
      <Fragment>
        <aside className={classes.leftbar} id="leftbar">
          <div className={classes.brand}>
            <Link to="/home">
              <Typography className={classes.smallBrand} edge="start">
                Chatsy
              </Typography>
            </Link>
          </div>
          <div className={classes.menuContainer}>
            <div className={classes.submenu}>
              <div className={classes.menuTitle}>MENU</div>
              <div className={classes.menuList}>
                <ul>
                  <li>
                    <Link to="/home">
                      <HomeIcon className={classes.menuIcon} />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/explore">
                      <ExploreIcon className={classes.menuIcon} />
                      Explore
                    </Link>
                  </li>
                  <li>
                    <Link to="/news">
                      <NewsIcon className={classes.menuIcon} />
                      Latest News
                    </Link>
                  </li>
                  <li>
                    <Link to={`/users/${handle}`}>
                      <PeopleIcon className={classes.menuIcon} />
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={classes.submenu}>
              <div className={classes.menuTitle}>HELP CENTER</div>
              <div className={classes.menuList}>
                <ul>
                  <li>
                    <a>About</a>
                  </li>
                  <li>
                    <a>Support</a>
                  </li>
                  <li>
                    <a>Privacy Policy</a>
                  </li>
                  <li>
                    <a>Terms</a>
                  </li>
                  <li>
                    <a>Development</a>
                  </li>
                  <li>
                    <a>Api</a>
                  </li>
                  <li>
                    <a>Jobs</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={classes.copyright}>© CHATSY 2019</div>
        </aside>

        <aside className={classes.leftbarHidden} id="leftbarHidden">
          <div className={classes.hiddenBrand}>
            <Link to="/home">
              <Typography className={classes.smallBrand} edge="start">
                CY
              </Typography>
            </Link>
          </div>
          <div className={classes.menuList}>
            <ul>
              <li>
                <Link to="/home">
                  <HomeIcon className={classes.hiddenIcon} />
                </Link>
              </li>
              <li>
                <Link to="/explore">
                  <ExploreIcon className={classes.hiddenIcon} />
                </Link>
              </li>
              <li>
                <Link to="/news">
                  <NewsIcon className={classes.hiddenIcon} />
                </Link>
              </li>
              <li>
                <Link to={`/users/${handle}`}>
                  <PeopleIcon className={classes.hiddenIcon} />
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Leftbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Leftbar));
