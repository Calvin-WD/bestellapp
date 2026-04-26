import { saveToLocalStorage } from "../scripts/saving.js";
import { getBasketDishTemplate } from "./template.js";
import { basket } from "./db.js";

const BASKET = "Basket";

export function addToBasket(dishId) {
  const basketDishesRef = document.getElementById("basketDishes-id");
  const dish = getDishFromDatabase(dishId);

  if (basket.dishes.length == 0) {
    basketDishesRef.innerHTML = getBasketDishTemplate(dish);
  } else {
    basketDishesRef.innerHTML += getBasketDishTemplate(dish);
  }
  basket.dishes.push(dish);
  saveToLocalStorage(BASKET, basket.dishes);
}

export function getDishFromDatabase(dishId) {
  let dish = "";

  for (let indexCat = 0; indexCat < menu.categories.length; indexCat++) {
    dish = menu.categories[indexCat].dishes.find(
      (element) => element.id == dishId,
    );

    if (dish != null) {
      return dish;
    }
  }
  return;
}
