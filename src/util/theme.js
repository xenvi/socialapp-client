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
      minWidth: "290px",
      minHeight: "460px"
    },
    formWrapper: {
      textAlign: "center",
      width: "100%",
      padding: "0 10px"
    },
    form: {
      padding: "0 15px 0 15px"
    },
    image: {
      margin: "20px auto 10px auto",
      width: "50px",
      height: "50px"
    },
    pageTitle: {
      color: "rgb(0,0,0,0.7)",
      margin: "10px auto 5px auto",
      fontWeight: "bold"
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
      marginBottom: 20
    },
    paper: {
      padding: 20,
      margin: "0 0 20px 0"
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
        width: 150,
        height: 150,
        objectFit: "cover",
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
    },
    icon: {
      paddingRight: 4
    },
    wrap: {
      display: "flex",
      verticalAlign: "middle",
      marginTop: 5
    },
    rightSpace: {
      paddingRight: 20
    },
    thickSeparator: {
      padding: 2,
      width: "100%",
      border: "none",
      backgroundColor: "rgba(0,0,0,0.05)"
    },
    rightAlign: {
      textAlign: "right"
    }
  }
};
