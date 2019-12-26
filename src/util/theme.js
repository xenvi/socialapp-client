export default {
  palette: {
    primary: {
      light: "#80d8ff",
      main: "#40c4ff",
      dark: "#00b0ff",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff8a80",
      main: "#f44336",
      dark: "#e53935",
      contrastText: "#fff"
    },
    tertiary: {
      light: "#FF7575",
      main: "#fff",
      dark: "#FF3F3F",
      contrastText: "#20cae6"
    }
  },
  spread: {
    typography: {
      useNextVariants: true
    },
    card: {
      backgroundColor: "#fff",
      minWidth: "400px",
      minHeight: "460px"
    },
    formWrapper: {
      textAlign: "center"
    },
    form: {
      padding: "0 25px 0 25px"
    },
    image: {
      margin: "20px auto 10px auto",
      width: "50px",
      height: "50px"
    },
    pageTitle: {
      fontWeight: "bold",
      color: "rgb(0,0,0,0.7)",
      margin: "10px auto 5px auto"
    },
    subTitle: {
      color: "rgb(0,0,0,0.5)",
      fontWeight: "bold",
      padding: "10px 0 0 0"
    },
    textField: {
      margin: "10px auto 10px auto"
    },
    link: {
      color: "#00b0ff",
      fontWeight: "bold"
    },
    or: {
      color: "rgb(0,0,0,0.5)",
      margin: "10px 0 10px 0",
      backgroundColor: "#fff"
    },
    button: {
      borderRadius: 20,
      padding: "5px 25px"
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "10px"
    },
    progress: {
      position: "absolute"
    },
    invisibleSeparator: {
      border: "none",
      margin: 4
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20
    },
    paper: {
      position: "fixed",
      width: 330,
      padding: 20
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: "#00bcd4"
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px"
      }
    }
  }
};
