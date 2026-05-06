const DELIVERY_FEE = 499;

let basket = {};

export function getBasket() {
  return basket;
}

export function addToBasket(dishId) {
  basket[dishId] = 1;
}