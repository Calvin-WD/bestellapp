/** import the javascript modules*/
import { renderCategories, renderBasket } from "./scripts/render.js";
import { addToBasket, getDishFromDatabase } from "./scripts/basket.js";
import {saveToLocalStorage, getFromLocalStorage} from "../scripts/saving.js";
import { menu, basket } from "./scripts/db.js";

const BASKET = "Basket";

function init() {
  let currentBasketDishes = getFromLocalStorage(BASKET);
  if (currentBasketDishes != null) {
    basket.dishes = currentBasketDishes;
  }
  renderCategories();
  renderBasket(basket);
}

window.init = init;
window.addToBasket = addToBasket;
window.menu = menu;
window.basket = basket;
