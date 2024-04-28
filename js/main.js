let backTop = document.querySelector(".back-top");
let header = document.querySelector(".header");
let body = document.querySelector("body");
let headerList = document.querySelector(".header__nav__right__list");
let hamburger = document.querySelector(".header__nav__right__btns__hamburger");
let closeHeaderList = document.querySelector(
  ".header__nav__right__list__close"
);

window.addEventListener("scroll", function () {
  showBackTop();
  showHeaderShrink();
});

hamburger.addEventListener("click", function () {
  headerList.classList.toggle("show__header__nav__right__list");
});

closeHeaderList.addEventListener("click", function () {
  headerList.classList.remove("show__header__nav__right__list");
});

function showBackTop() {
  if (scrollY > 100) {
    backTop.classList.add("show__back-top");
  } else {
    backTop.classList.remove("show__back-top");
  }
}
function showHeaderShrink() {
  if (scrollY > 0) {
    header.classList.add("show__header__shrink");
  } else {
    header.classList.remove("show__header__shrink");
  }
}
