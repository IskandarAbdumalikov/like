let loginLink = document.querySelector(".login__link");
let module = document.querySelector(".module");
let registerLink = document.querySelector(".register__link");
let loginRegisterLink = document.querySelector(".login__link__register");
let registerRegisterLink = document.querySelector(".register__link__register");
let xBtnRegister = document.querySelector(".x__button__register");
let xBtnLogin = document.querySelector(".x__button__login");
let showModuleBtn = document.querySelector(".logIN__btn");

registerLink.addEventListener("click", () => {
  module.style.transform = " translate(-14%,-50%)";
});

loginLink.addEventListener("click", () => {
  module.style.transform = " translate(-86%,-50%)";
});

registerRegisterLink.addEventListener("click", () => {
  module.style.transform = " translate(-14%,-50%)";
});

loginRegisterLink.addEventListener("click", () => {
  module.style.transform = " translate(-86%,-50%)";
});

xBtnRegister.addEventListener("click", () => {
  module.style.opacity="0"
  module.style.visibility = "hidden";
});

xBtnLogin.addEventListener("click", () => {
  module.style.opacity = "0";
  module.style.visibility = "hidden";
});


showModuleBtn.addEventListener("click", () => {
  module.style.opacity = "1";
  module.style.visibility = "visible";
});

