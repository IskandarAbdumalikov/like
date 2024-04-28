let wrapper = document.querySelector(".wrapper__wishlist");
let wishlist = JSON.parse(localStorage.getItem("wishlist"));

function createCard(data) {
  let cards = "";

  data.forEach((product) => {
    cards += `
        <div class="card"   data-id=${product.id}>
        <img class="card__img" src="${product.images[0]}" alt="">
        <div class="card__desc">
          <div class="rating">
            <h3>${product.rating}</h3> <img class="star" src="/images/star.svg" alt="">
          </div>
          <h3>${product.title}</h3>
          <p>${product.price} ₽</p>
          <button class="card__btn">See more details</button>
          <i id="like" class="fa-regular fa-heart like"></i>
        </div>
      </div>
        `;
  });
  wrapper.innerHTML = cards;
}

createCard(wishlist);

const addToWishList = (id) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist"));
  let updatedWishlist = wishlist.filter((el) => el.id !== +id);
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  createCard(updatedWishlist);
};

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
