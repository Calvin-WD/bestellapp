const DELIVERY_FEE = 499;

let basket = {};

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

export function isDishInBasket(dishId) {
  let isInBasket = Object.hasOwn(basket, dishId);
  return isInBasket;
}