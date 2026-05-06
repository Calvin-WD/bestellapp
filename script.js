import { getMenu } from "./scripts/db.js";
import {
  addDishAmount,
  addToBasket,
  getBasket,
  removeFromBasket,
  subDishAmount,
} from "./scripts/basket.js";
import { renderBasket, renderCategories } from "./scripts/render.js";
import {
  BASKET_ADD_AMOUNT,
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_SUB_AMOUNT,
} from "./scripts/constants.js";

document.addEventListener("DOMContentLoaded", init);

const MENU = getMenu();
let basket = getBasket();

function init() {
  renderCategories(MENU);
  renderBasket(basket);

  setEventListeners();
}

function setEventListeners() {
  document.body.addEventListener("click", handleClick);
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");

  if (target == null) {
    return;
  }

  const action = target.dataset.action;
  const dishId = target.dataset.dishId;

  if (action === BASKET_ADD_ITEM) {
    addToBasket(Number(dishId));
    renderCategories(MENU);
    renderBasket(basket);
  } else if (action === BASKET_REMOVE_ITEM) {
    removeFromBasket(Number(dishId));
    renderCategories(MENU);
    renderBasket(basket);
  } else if (action === BASKET_ADD_AMOUNT) {
    addDishAmount(Number(dishId));
    renderBasket(basket);
  } else if (action === BASKET_SUB_AMOUNT) {
    subDishAmount(Number(dishId));
    renderBasket(basket);
  }
}
