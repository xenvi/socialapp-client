export default {
  palette: {
    primary: {
      light: "#3fc0ee",
      main: "#23a6d5",
      dark: "#00759f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff5999",
      main: "#e73c7e",
      dark: "#d40052",
      contrastText: "#fff",
    },
    tertiary: {
      light: "#FF7575",
      main: "#fff",
      dark: "#FF3F3F",
      contrastText: "#20cae6",
    },
  },
  spread: {
    typography: {
      useNextVariants: true,
    },
    formWrapper: {
      textAlign: "center",
      padding: "0 10px",
    },
    form: {
      padding: "0 15px",
      minWidth: 250,
    },
    image: {
      margin: "20px auto 10px auto",
      width: "40px",
      height: "40px",
    },
    pageTitle: {
      color: "rgb(0,0,0,0.7)",
      margin: "15px auto 05px auto",
      fontWeight: "bold",
      fontSize: 37,
    },
    subTitle: {
      color: "rgb(0,0,0,0.5)",
      fontWeight: "bold",
    },
    textField: {
      margin: "10px auto 0 auto",
      outline: "none",
      fontSize: 18,
    },
    link: {
      color: "#00b0ff",
      fontWeight: "bold",
    },
    or: {
      color: "rgb(0,0,0,0.5)",
      fontSize: "1rem",
      margin: "4em 0 1em 0",
    },
    button: {
      padding: "8px",
      borderRadius: 20,
      width: "100%",
      fontSize: 15,
      fontWeight: "bold",
      textShadow: "0 5px 5px rgba(0,0,0,0.5)",
      boxShadow: "0 10px 10px rgba(0,0,0,0.2)",
    },
    subtleButton: {
      padding: "6px 50px",
      borderRadius: 20,
      fontSize: 15,
      fontWeight: "bold",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "10px",
    },
    progress: {
      position: "absolute",
    },
    brand: {
      fontSize: 80,
      letterSpacing: "1px",
      textShadow: "0 10px 20px rgba(0,0,0,0.5)",
      fontFamily: "Fredoka One, cursive",
    },
    smallBrand: {
      fontSize: 30,
      letterSpacing: "1px",
      textShadow: "0 5px 5px rgba(0,0,0,0.3)",
      fontFamily: "Fredoka One, cursive",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "80%",
      marginBottom: 20,
    },
    paper: {
      padding: 20,
      margin: "0 0 20px 0",
    },
    profile: {
      margin: "0 auto",
      maxWidth: 500,
      textAlign: "center",
      padding: "10px 40px 20px 40px",
      "& .image-wrapper": {
        position: "relative",
      },
      "& .profile-image": {
        width: 120,
        height: 120,
        objectFit: "cover",
        borderRadius: "50%",
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
    icon: {
      paddingRight: 4,
      fontSize: 20,
      cursor: "pointer",
    },
    wrap: {
      display: "flex",
      alignItems: "center",
      marginTop: 10,
    },
    rightSpace: {
      paddingRight: 20,
    },
    thickSeparator: {
      padding: 2,
      width: "100%",
      border: "none",
      backgroundColor: "rgba(0,0,0,0.05)",
    },
    rightAlign: {
      textAlign: "right",
    },
    // create post
    submitButton: {
      marginTop: 5,
      borderRadius: 20,
      fontSize: 13,
      fontWeight: "bold",
      textShadow: "0 5px 5px rgba(0,0,0,0.3)",
      boxShadow: "0 5px 5px rgba(0,0,0,0.2)",
      padding: "7px 20px",
    },
    progressSpinner: {
      position: "absolute",
    },
    closeButton: {
      position: "absolute",
      left: "91%",
      top: "6%",
      cursor: "pointer",
    },
    addButton: {
      cursor: "pointer",
      fontSize: "40pt",
    },
  },
};
