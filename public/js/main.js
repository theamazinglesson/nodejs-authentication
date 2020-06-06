// JAVASCRIPT FOR FRONT END


console.log(window.location);
const port = window.location.port;
const host = window.location.host;
const domain = `http://${host}`;
// console.log(domain);


if (window.location.href === `${domain}/users/profile`) {
  console.log("you are in profile page");
  const before_signin_button = document.querySelectorAll(".before-signin");
  before_signin_button.forEach((btn) => {
    btn.remove();
  });
} else {
  const before_signin_button = document.querySelectorAll(".after-signin");
  before_signin_button.forEach((btn) => {
    btn.remove();
  });
}
