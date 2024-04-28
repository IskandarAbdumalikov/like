let select = document.querySelector(".select");
let API_URL = "https://dummyjson.com";
let searchInput = document.querySelector(".search__input");
let loading = document.querySelector(".loading");
let seeMoreBtn = document.querySelector(".see__more__btn");
let searchBtn = document.querySelector(".search__btn");

const LIMIT_COUNT = 4;

let count = 1;

async function fetchData(api) {
  const data = await fetch(`${api}/products?limit=${LIMIT_COUNT * count}`, {
    method: "GET",
  });
  data
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
      seeMoreBtn.innerHTML = "See more";
      seeMoreBtn.removeAttribute("disabled");
    });
}
async function fetchCategories(api) {
  const data = await fetch(`${api}/products/categories`, {
    method: "GET",
  });
  data
    .json()
    .then((res) => createOptions(res))
    .catch((err) => console.log(err));
}

fetchCategories(API_URL);

function createOptions(data) {
  let options = '<option value="all">All</option>';

  data.forEach((category) => {
    options += `     
            <option value="${category}">${category}</option>
        `;
  });
  select.innerHTML = options;
  select.prepend(`<option value="all">All</option>`);
}

const wrapper = document.querySelector(".wrapper");

async function fetchProducts(api, option, searchValue) {
  let url = "";
  if (option === "all") {
    if (searchValue) {
      url = `${api}/products/search/?q=${searchValue}`;
    } else {
      url = `${api}/products`;
    }
  } else {
    url = `${api}/products/category/${option}`;
  }
  const data = await fetch(url, {
    method: "GET",
  });

  data
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.log(err))
    .finally(() => {
      console.log(5);
    });
}

fetchProducts(API_URL, "all");

function createCard(data) {
  let cards = "";

  data.products.forEach((product) => {
    cards += `
        <div class="card">
        <img class="card__img" data-id="${product.id}" src="${product.images[0]}" alt="">
        <div class="card__desc">
          <div class="rating">
            <h3>${product.rating}</h3> <img class="star" src="/images/star.svg" alt="">
          </div>
          <h3>${product.title}</h3>
          <p>${product.price} ₽</p>
          <button data-id="${product.id}" class="card__btn">Ko'proq ma'lumotlar</button>
        </div>
      </div>
        `;
  });
  wrapper.innerHTML = cards;
}

select.addEventListener("change", (e) => {
  let optionValue = e.target.value;
  fetchProducts(API_URL, optionValue);
});

searchInput.addEventListener("input", (e) => {
  let searchValue = e.target.value.trim();
  if (searchValue) {
    fetchProducts(API_URL, "all", searchValue);
    select.value = "all";
  }
});

searchBtn.addEventListener("click", (e) => {
  let searchValue = e.target.value.trim();
  if (searchValue) {
    fetchProducts(API_URL, "all", searchValue);
    select.value = "all";
  }
});

seeMoreBtn.addEventListener("click", () => {
  count++;
  fetchData(API_URL);
  seeMoreBtn.innerHTML = "Yuklanmoqda...";
  seeMoreBtn.setAttribute("disabled", true);
});

fetchData(API_URL);

function createLoadingCard(count) {
  let loadCard = "";
  for (let i = 0; i < count; i++) {
    loadCard += `   
          <div class="loading__item">
          <div class="loading__img bg__animation"></div>
          <div class="loading__title bg__animation"></div>
          <div class="loading__title bg__animation"></div>
        </div>
            `;
    loading.innerHTML = loadCard;
  }
}

createLoadingCard(LIMIT_COUNT);

wrapper.addEventListener("click", (e) => {
  if (
    e.target.className === "card__img" ||
    e.target.className === "card__btn"
  ) {
    let id = e.target.dataset.id;
    window.open(`/pages/products.html?id=${id}`, "_self");
  }
});
