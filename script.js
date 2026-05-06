import { menu } from "./scripts/db.js";
import { addToBasket, getBasket } from "./scripts/basket.js";
import { renderBasket, renderCategories } from "./scripts/render.js";
import { BASKET_ADD_ITEM } from "./scripts/constants.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  renderCategories(menu);
  renderBasket(getBasket());

  setEventListeners();
}

function setEventListeners() {
  document.body.addEventListener("click", handleClick);
}

function handleClick(event) {
  const target = event.target;

  if (target == null) {
    return;
  }

  const action = target.dataset.action;
  const dishId = target.dataset.dishId;

  if (action === BASKET_ADD_ITEM) {
    addToBasket(Number(dishId));
    renderBasket(getBasket());
  }
}
