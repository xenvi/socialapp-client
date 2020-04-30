window.onload = function () {
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
};
