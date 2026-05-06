import { BASKET, BASKET_DELIVERY_FEE } from "./constants.js";
import { getDishPriceById } from "./db.js";
import { getFromLocalStorage } from "./store.js";

const storedBasket = getFromLocalStorage(BASKET);
let basket = {};

if (storedBasket) {
  basket = storedBasket;
}

export function getBasket() {
  return basket;
}

export function addToBasket(dishId) {
  basket[dishId] = 1;
}

export function removeFromBasket(dishId) {
  delete basket[dishId];
}

export function addDishAmount(dishId) {
  basket[dishId]++;
}

export function subDishAmount(dishId) {
  basket[dishId]--;
}

export function calculateBasketSubTotal() {
  const basketArray = getBasketAsArray();
  let subTotal = 0;

  for (let indexBasket = 0; indexBasket < basketArray.length; indexBasket++) {
    const dishId = basketArray[indexBasket][0];
    const dishAmount = basketArray[indexBasket][1];
    subTotal += calculateDishTotalPrice(dishId, dishAmount);
  }
  return subTotal;
}

export function calculateBasketTotal() {
  const subTotal = calculateBasketSubTotal();
  return subTotal + BASKET_DELIVERY_FEE;
}

export function getBasketAsArray() {
  return Object.entries(basket);
}

export function isDishInBasket(dishId) {
  let isInBasket = Object.hasOwn(basket, dishId);
  return isInBasket;
}

export function isBasketEmpty() {
  if (Object.keys(basket).length === 0) {
    return true;
  } else {
    return false;
  }
}


function calculateDishTotalPrice(dishId, dishAmount) {
  const dishPrice = getDishPriceById(dishId);
  return dishAmount * dishPrice;
}
