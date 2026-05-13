import { BASKET, BASKET_DELIVERY_FEE } from "./constants.js";
import { getDishPriceById } from "./db.js";
import { getFromLocalStorage } from "./store.js";

const storedBasket = getFromLocalStorage(BASKET);
let basket = {};

if (storedBasket) {
  basket = storedBasket;
}

/** Returns the current basket object */
export function getBasket() {
  return basket;
}

/** Adds a dish with an amount of 1 to the basket */
export function addToBasket(dishId) {
  basket[dishId] = 1;
}

/** Removes a dish from the basket */
export function removeFromBasket(dishId) {
  delete basket[dishId];
}

/** Removes all contained dishes from the basket */
export function clearBasket() {
  const basketArray = getBasketAsArray();

  for (let indexBasket = 0; indexBasket < basketArray.length; indexBasket++) {
    const dishId = basketArray[indexBasket][0];
    removeFromBasket(dishId);
  }
}

/** Increases the amount of a dish in the basket by 1 */
export function addDishAmount(dishId) {
  basket[dishId]++;
}

/** Decreases the amount of a dish in the basket by 1 */
export function subDishAmount(dishId) {
  basket[dishId]--;
}

/** Calculates the subtotal of all dishes in the basket, excluding delivery fee */
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

/** Calculates the total price of the basket including the delivery fee */
export function calculateBasketTotal() {
  const subTotal = calculateBasketSubTotal();
  return subTotal + BASKET_DELIVERY_FEE;
}

/** Converts the basket object into an array */
export function getBasketAsArray() {
  return Object.entries(basket);
}

/** Gets the basket array length, number of dishes in the basket */
export function getBasketLength() {
  return Object.keys(basket).length;
}

/** Checks if a dish is already in the basket */
export function isDishInBasket(dishId) {
  let isInBasket = Object.hasOwn(basket, dishId);
  return isInBasket;
}

/** Checks if the basket is currently empty */
export function isBasketEmpty() {
  if (getBasketLength() === 0) {
    return true;
  } else {
    return false;
  }
}

/** Calculates the total price of a dish with its amount in the basket */
function calculateDishTotalPrice(dishId, dishAmount) {
  const dishPrice = getDishPriceById(dishId);
  return dishAmount * dishPrice;
}
