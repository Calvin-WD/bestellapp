/** import the javascript modules*/
import { renderCategories } from "./scripts/render.js";
import { menu, basket } from "./scripts/db.js";

const BASKET = "Basket";

function init() {
  let currentBasketDishes = getFromLocalStorage(BASKET);
    if (currentBasketDishes != null) {
      basket.dishes = currentBasketDishes;
    }
  renderCategories();
}

function addToBasket(dishId) {
  const dish = getDishFromDatabase(dishId);
  basket.dishes.push(dish);

  saveToLocalStorage(BASKET, basket.dishes);
}

function getDishFromDatabase(dishId) {
  let dish = "";

  for (let indexCat = 0; indexCat < menu.categories.length; indexCat++) {
    dish = menu.categories[indexCat].dishes.filter(
      (element) => element.id == dishId,
    );

    if (dish.length != 0) {
      return dish;
    }
  }
  return;
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
