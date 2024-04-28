let isLogin = localStorage.getItem("x-auth-token");
let logoutBtn = document.querySelector(".log__out__btn");

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.open(`/index.html`, "_self");
});

function checkUser() {
  if (!isLogin) {
    window.location.replace("/index.html");
  }
}
checkUser();
