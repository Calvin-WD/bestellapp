/** import the javascript modules*/
import { renderCategories, renderBasket } from "./scripts/render.js";
import {
  basket,
  addToBasket,
  removeFromBasket,
  changeBasketDishAmount,
} from "./scripts/basket.js";
import { saveToLocalStorage, getFromLocalStorage } from "../scripts/saving.js";
import { menu } from "./scripts/db.js";

const MENU = "Menu";
const BASKET_DISHES = "Basket-Dishes";
const BASKET_SUM = "Basket-Summery";

function init() {
  // const currentMenu = getFromLocalStorage(MENU);
  const currentBasketDishes = getFromLocalStorage(BASKET_DISHES);
  const currentBasketSummery = getFromLocalStorage(BASKET_SUM);

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
window.removeFromBasket = removeFromBasket;
window.changeBasketDishAmount = changeBasketDishAmount;
window.menu = menu;

window.basket = basket;
