import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Notifications from "./Notifications";
import { getNewUsers } from "../../redux/actions/dataActions";

// redux imports
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spread,
  rightbar: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    background: "#161829",
    width: "18em",
    height: "100%",
    borderLeft: "0.1em solid #222540",
    overflow: "auto",
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
        color: "#999",
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
});

export class Rightbar extends Component {
  componentDidMount() {
    this.props.getNewUsers();
  }
  render() {
    const {
      classes,
      user: {
        credentials: { handle, imageUrl },
      },
      data: { newusers },
      UI: { loading },
    } = this.props;

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

    return (
      <aside className={classes.rightbar}>
        <div className={classes.rightNav}>
          <Link to={`/users/${handle}`} className={classes.profileLink}>
            {handle}
            <img src={imageUrl} alt="profile" className={classes.image} />
          </Link>
          <Notifications />
        </div>
        <div className={classes.menuContainer}>
          <div className={classes.submenu}>
            <div className={classes.menuTitle}>MEET NEW PEOPLE</div>
            <div className={classes.menuList}>{users}</div>
          </div>
          <div className={classes.submenu}>
            <div className={classes.menuTitle}>TRENDING NEWS</div>
            <div className={classes.menuList}></div>
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
