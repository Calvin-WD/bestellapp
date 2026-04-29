import { saveToLocalStorage } from "../scripts/saving.js";
import { getBasketDishTemplate } from "./template.js";
import { basket } from "./db.js";
import { renderBasket, renderBasketSummery } from "./render.js";

const BASKET_DISHES = "Basket-Dishes";
const BASKET_SUM = "Basket-Summery";

export function addToBasket(dishId, button) {
  const basketDishesRef = document.getElementById("basketDishes-id");
  const dish = getDishFromDatabase(dishId);

  // addDishToBasketUi(basketDishesRef, dish);
  updateDatabase(dish);
  changeButtonState(button);
  renderBasketSummery(basket);
  renderBasket(basket);
}

/** find dish by dishId using Arrow-function 'find()'
 * iterates throw categories dishes an returns dish after finds it
 */
function getDishFromDatabase(dishId) {
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

/** add dishes price to baskets subtotal */
function sumSubtotal(dish) {
  basket.summery.subTotal += dish.price;
}

function sumTotal(dish) {
  sumSubtotal(dish);
  basket.summery.total = basket.summery.subTotal + basket.summery.fee;
}

function updateDatabase(dish) {
  basket.dishes.push(dish);
  addBasketDishAmount(dish);
  saveToLocalStorage(BASKET_DISHES, basket.dishes);
  sumTotal(dish);
  saveToLocalStorage(BASKET_SUM, basket.summery);
}

function addBasketDishAmount(dish) {
  dish.amount++;
}

export function changeButtonState(button) {
  button.innerHTML = 'Im Warenkorb';
  button.classList.add('button--added');
  button.disabled = true;
}
