/** import the javascript modules*/
import { renderCategories, renderBasket } from "./scripts/render.js";
import { addToBasket } from "./scripts/basket.js";
import { saveToLocalStorage, getFromLocalStorage } from "../scripts/saving.js";
import { menu, basket } from "./scripts/db.js";

const BASKET_DISHES = "Basket-Dishes";
const BASKET_SUM = "Basket-Summery";

function init() {
  let currentBasketDishes = getFromLocalStorage(BASKET_DISHES);
  let currentBasketSummery = getFromLocalStorage(BASKET_SUM);

  if (currentBasketDishes != null) {
    basket.dishes = currentBasketDishes;
  }
  if (currentBasketSummery != null) {
    basket.summery = currentBasketSummery;
  }

  renderCategories();
  renderBasket(basket);
}

window.init = init;
window.addToBasket = addToBasket;
window.menu = menu;
window.basket = basket;
