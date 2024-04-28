let select = document.querySelector(".select");
const API_URL = "https://dummyjson.com";
let searchInput = document.querySelector(".search__input");
let seeMoreBtn = document.querySelector(".see__more__btn");
let searchBtn = document.querySelector(".search__btn");
let likes = document.querySelector(".like__counts");
const LIMIT_COUNT = 4;
let count = 1;
let wrapper = document.querySelector(".wrapper");
let likesCount = JSON.parse(localStorage.getItem("wishlist")).length
console.log(likesCount);
// Funksiyalar
async function fetchData(api) {
  try {
    const data = await fetch(`${api}/products?limit=${LIMIT_COUNT * count}`);
    const res = await data.json();
    createCard(res);
  } catch (error) {
    console.log(error);
  } finally {
    seeMoreBtn.innerHTML = "See more";
    seeMoreBtn.removeAttribute("disabled");
  }
}

async function fetchCategories(api) {
  try {
    const data = await fetch(`${api}/products/categories`);
    const res = await data.json();
    createOptions(res);
  } catch (error) {
    console.log(error);
  }
}

function createOptions(data) {
  let options = '<option value="all">All</option>';
  data.forEach((category) => {
    options += `<option value="${category}">${category}</option>`;
  });
  select.innerHTML = options;
  select.append(`<option value="all">All</option>`);
}

async function fetchProducts(api, option, searchValue) {
  let url = "";
  if (option === "all") {
    url = searchValue
      ? `${api}/products/search/?q=${searchValue}`
      : `${api}/products`;
  } else {
    url = `${api}/products/category/${option}`;
  }
  try {
    const data = await fetch(url);
    const res = await data.json();
    createCard(res);
  } catch (error) {
    console.log(error);
  }
}

function createCard(data) {
  let cards = "";
  data.products.forEach((product) => {
    cards += `
      <div class="card"   data-id=${product.id}>
        <img class="card__img" src="${product.images[0]}" alt="">
        <div class="card__desc">
          <div class="rating">
            <h3>${product.rating}</h3> 
          </div>
          <h3>${product.title}</h3>
          <p>${product.price} ₽</p>
          <button class="card__btn">See more details</button>
          <i ></i>
          <img id="like" class="fa-regular fa-heart like" src="/images/like.svg" alt="">
        </div>
      </div>
    `;
  });
  wrapper.innerHTML = cards;
}

select.addEventListener("change", (e) => {
  const optionValue = e.target.value;
  console.log(optionValue);
  fetchProducts(API_URL, optionValue);
});

searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.trim();
  if (searchValue) {
    fetchProducts(API_URL, "all", searchValue);
    select.value = "all";
  }
});

searchBtn.addEventListener("click", () => {
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    fetchProducts(API_URL, "all", searchValue);
    select.value = "all";
  }
});

seeMoreBtn.addEventListener("click", () => {
  count++;
  fetchData(API_URL);
  seeMoreBtn.innerHTML = "Loading...";
  seeMoreBtn.setAttribute("disabled", true);
});

fetchCategories(API_URL);
fetchProducts(API_URL, "all");

wrapper.addEventListener("click", (e) => {
  if (
    e.target.className === "card__image" ||
    e.target.className === "card__buy-btn"
  ) {
    let id = e.target.closest(".card").dataset.id;
    window.open(`./pages/product.html?productId=${id}`, "_self");
  } else if (e.target.className.includes("like")) {
    let id = e.target.closest(".card").dataset.id;
    addToWishList(id);
  }
});

let password = document.querySelector(".input__password");
let eye = document.querySelector(".eye");
let eyeSlash = document.querySelector(".eye-slash");

eye.addEventListener("click", () => {
  password.setAttribute("type", "text");
  eyeSlash.style.display = "block";
  eye.style.display = "none";
});

eyeSlash.addEventListener("click", () => {
  password.setAttribute("type", "password");
  eye.style.display = "block";
  eyeSlash.style.display = "none";
});

const addToWishList = async (id) => {
  const data = await fetch(`${API_URL}/products/${id}`);
  data
    .json()
    .then((product) => {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      let index = wishlist.findIndex((el) => el.id === product.id);
      let updatedWishlist = [];
      if (index < 0) {
        updatedWishlist = [...wishlist, product];
        likesCount++
      } else {
        updatedWishlist = wishlist.filter((el) => el.id !== product.id);
        likesCount--
      }
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      likes.innerHTML = likesCount
    })
    .catch((err) => console.log(err));

  console.log("addToWishList >>>", id);
};
