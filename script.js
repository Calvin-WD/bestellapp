import { getMenu } from "./scripts/db.js";
import {
  addDishAmount,
  addToBasket,
  clearBasket,
  getBasket,
  getBasketLength,
  removeFromBasket,
  subDishAmount,
} from "./scripts/basket.js";
import {
  closeBasket,
  closeDialog,
  openBasket,
  openMobileBasketToggle,
  closeMobileBasket,
  openDialog,
  renderBasket,
  renderCategories,
  renderMobileBasket,
} from "./scripts/render.js";
import {
  BASKET,
  BASKET_ADD_AMOUNT,
  BASKET_ADD_ITEM,
  BASKET_BUY_NOW,
  BASKET_REMOVE_ITEM,
  BASKET_SUB_AMOUNT,
  DIALOG_CLOSE,
  MOBILE_OPEN_BASKET,
} from "./scripts/constants.js";
import { saveToLocalStorage } from "./scripts/store.js";

document.addEventListener("DOMContentLoaded", init);

const MENU = getMenu();
let basket = getBasket();

function init() {
  renderAll();
  setEventListeners();
}

function renderAll() {
  renderCategories(MENU);
  renderBasket(basket);
  renderMobileBasket(basket);
}

/** Registers global event listeners */
function setEventListeners() {
  document.body.addEventListener("click", handleClick);
}

/** Handles all click events based on 'data-action' attributes */
function handleClick(event) {
  const target = event.target.closest("[data-action]");

  if (target == null) {
    return;
  }

  const action = target.dataset.action;
  const dishId = target.dataset.dishId;

  if (action === BASKET_ADD_ITEM) {
    addToBasket(Number(dishId));
    saveToLocalStorage(BASKET, basket);
    renderAll();
    if (getBasketLength() <= 1) {
      openBasket();
    }
  } else if (action === BASKET_REMOVE_ITEM) {
    removeFromBasket(Number(dishId));
    saveToLocalStorage(BASKET, basket);
    renderAll();
  } else if (action === BASKET_ADD_AMOUNT) {
    addDishAmount(Number(dishId));
    saveToLocalStorage(BASKET, basket);
    renderBasket(basket);
    renderMobileBasket(basket);
  } else if (action === BASKET_SUB_AMOUNT) {
    subDishAmount(Number(dishId));
    saveToLocalStorage(BASKET, basket);
    renderBasket(basket);
    renderMobileBasket(basket);
  } else if (action === MOBILE_OPEN_BASKET) {
    openMobileBasketToggle();
  } else if (action === BASKET_BUY_NOW) {
    clearBasket();
    saveToLocalStorage(BASKET, basket);
    renderCategories(MENU);
    closeBasket();
    closeMobileBasket(basket);
    openDialog();
  } else if (action === DIALOG_CLOSE) {
    closeDialog();
  }
}
