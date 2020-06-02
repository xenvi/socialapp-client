document.addEventListener(
  "DOMContentLoaded",
  function () {

    // login signup form, disable space
    const inputs = document.getElementsByClassName("cover-textField-8");

    Array.from(inputs).forEach(function(input) {
      input.addEventListener("keydown", function (e) {
        return e.which !== 32;
    });
    });

    // login signup form transitions

    const loginTitle = document.getElementsByClassName("login-title")[0];
    const signupTitle = document.getElementsByClassName("signup-title")[0];
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (signupTitle) {
      signupTitle.onclick = () => {
        signupTitle.classList.remove("translucent");
        loginTitle.classList.add("translucent");

        loginForm.classList.remove("is-visible");
        signupForm.classList.add("is-visible");
      };
    }

    if (loginTitle) {
      loginTitle.onclick = () => {
        loginTitle.classList.remove("translucent");
        signupTitle.classList.add("translucent");

        loginForm.classList.add("is-visible");
        signupForm.classList.remove("is-visible");
      };
    }
  },
  false
);
