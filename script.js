/** import the javascript modules*/
import { renderCategories } from "./scripts/render.js";
import { addToBasket, getDishFromDatabase } from "./scripts/basket.js";
import { menu, basket } from "./scripts/db.js";

const BASKET = "Basket";

function init() {
  let currentBasketDishes = getFromLocalStorage(BASKET);
  if (currentBasketDishes != null) {
    basket.dishes = currentBasketDishes;
  }
  renderCategories();
}

function saveToLocalStorage(keyString, value) {
  localStorage.setItem(keyString, JSON.stringify(value));
}

function getFromLocalStorage(keyString) {
  const data = JSON.parse(localStorage.getItem(keyString));
  return data;
}

window.init = init;
window.addToBasket = addToBasket;
window.menu = menu;
window.basket = basket;
