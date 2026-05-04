import { saveToLocalStorage } from "../scripts/saving.js";
import { getBasketDishTemplate } from "./template.js";
import { renderBasket, renderCategories } from "./render.js";
import { menu } from "./db.js";

const MENU = "Menu";
const BASKET = "basket";
const BASKET_DISHES = "Basket-Dishes";
const BASKET_SUM = "Basket-Summery";
const APP = "append";
const DEL = "delete";
const ADD = "addition";
const SUB = "subtraction";
const PLACEHOLDER_INT = 0;

export let basket = {
  dishes: [],
  summery: {
    subTotal: 0,
    total: 0,
    fee: 4.99,
  },
};

export function addToBasket(dishId, button, dbAction) {
  const basketDishesRef = document.getElementById("basketDishes-id");
  const dish = getDishFromDatabase(dishId);
  const deleteButtonUpper = dish.amount <= 1 ? "dNone" : "";
  const deleteButtonLower = dish.amount > 1 ? "dNone" : "";
  const quantitySubButton = dish.amount <= 1 ? "dNone" : "";

  updateBasket(dish, dishId, dbAction);

  if (basket.dishes.length <= 1) {
    basketDishesRef.innerHTML = getBasketDishTemplate(
      dish,
      deleteButtonUpper,
      deleteButtonLower,
      quantitySubButton,
    );
  } else {
    basketDishesRef.innerHTML += getBasketDishTemplate(
      dish,
      deleteButtonUpper,
      deleteButtonLower,
      quantitySubButton,
    );
  }

  setScrollIfNeed(basket.dishes);
}

export function removeFromBasket(dishId, dbAction) {
  // const basketDishesRef = document.getElementById("basketDishes-id");
  const dish = getDishFromBasketDatabase(dishId);
  const dishIndex = getDishIndexFromBasketDatabase(dishId);

  updateBasket(dish, dishIndex, dbAction);
  renderBasket(basket);
  setScrollIfNeed(basket.dishes);
}

export function changeBasketDishAmount(dishId, dbAction) {
  const dishAmountRef = document.getElementById("amount-" + dishId);
  const dish = getDishFromBasketDatabase(dishId);
  updateBasket(dish, PLACEHOLDER_INT, dbAction);

  if (dishAmountRef != null) {
    dishAmountRef.innerHTML = dish.amount;
  }
}

export function changeButtonState(dish) {
  const button = document.getElementById("buttonAddToBasket-id" + dish.id);
  const menuDish = getDishFromDatabase(dish.id);

  if (button.innerText == "Hinzufügen") {
    button.innerHTML = "Im Warenkorb";
    button.classList.add("button--added");
    button.disabled = true;
  } else if (button.innerText == "Im Warenkorb") {
    button.innerHTML = "Hinzufügen";
    button.classList.remove("button--added");
    button.disabled = false;
  }
}

export function switchButton(dish) {
  const delButtons = document.querySelectorAll(".js-delButton-" + dish.id);
  const subButton = document.getElementById("subButton-" + dish.id);

  if (delButtons != null && subButton != null) {

    for (let indexButton = 0; indexButton < delButtons.length; indexButton++) {
      const button = delButtons[indexButton];
      button.classList.toggle("dNone");
    }
    if (dish.amount <= 1) {
      subButton.classList.add("dNone");
    } else {
      subButton.classList.remove("dNone");
    }
  }
  console.log(delButtons);
  
}

export function checkIfDishIsInBasket(dish) {
  let isInBasket = basket.dishes.some((element) => element.id == dish.id);
  return isInBasket;
}

export function setScrollIfNeed(dishes) {
  const basketDishContainerRef = document.getElementById("basketDishes-id");
  if (dishes.length > 3) {
    basketDishContainerRef.classList.add("oFlowYscroll");
  } else {
    basketDishContainerRef.classList.remove("oFlowYscroll");
  }
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

function getDishFromBasketDatabase(dishId) {
  const dish = basket.dishes.find((element) => element.id == dishId);
  return dish;
}

function getDishIndexFromBasketDatabase(dishId) {
  const dishIndex = basket.dishes.findIndex((element) => element.id == dishId);
  return dishIndex;
}

/** summerize the price of the dishes to baskets subtotal */
function sumSubtotal(dish, dbAction) {
  switch (dbAction) {
    case DEL:
      basket.summery.subTotal = 0;
      for (
        let indexBasketDish = 0;
        indexBasketDish < basket.dishes.length;
        indexBasketDish++
      ) {
        const dish = basket.dishes[indexBasketDish];
        basket.summery.subTotal += dish.price;
      }
      return basket.summery.subTotal;
      break;
    case ADD:
    case APP:
      return (basket.summery.subTotal += dish.price);
      break;
    case SUB:
      return (basket.summery.subTotal -= dish.price);
      break;
  }
}

function sumTotal(dish, dbAction) {
  const subTotal = sumSubtotal(dish, dbAction);
  let total = 0;

  basket.summery.total = basket.summery.subTotal + basket.summery.fee;
  total = basket.summery.total;

  showSummery(subTotal, total);
}

function showSummery(subTotal, total) {
  const subTotalRef = document.getElementById("subTotal-id");
  const totalRef = document.getElementById("total-id");

  subTotalRef.innerHTML = subTotal.toFixed(2) + "€";
  totalRef.innerHTML = total.toFixed(2) + "€";
}

function updateBasket(dish, dishIndex, dbAction) {
  switch (dbAction) {
    case APP:
      addBasketDish(dish);
      changeButtonState(dish);
      break;
    case DEL:
      removeBasketDish(dish, dishIndex);
      changeButtonState(dish);
      break;
    case ADD:
      addBasketDishAmount(dish);
      break;
    case SUB:
      subBasketDishAmount(dish);
      break;
  }
  updateBasketDb(dish, dbAction);
}

function updateBasketDb(dish, dbAction) {
  saveToLocalStorage(BASKET_DISHES, basket.dishes);
  sumTotal(dish, dbAction);
  saveToLocalStorage(BASKET_SUM, basket.summery);
}

function addBasketDish(dish) {
  basket.dishes.push(dish);
  addBasketDishAmount(dish);
}

function removeBasketDish(dish, dishIndex) {
  basket.dishes.splice(dishIndex, 1);
  dish.amount = 0;
}

function addBasketDishAmount(dish) {
  dish.amount++;

  if (dish.amount == 2) {
    switchButton(dish);
  }
}

function subBasketDishAmount(dish) {
  dish.amount--;

  if (dish.amount <= 1) {
    switchButton(dish);
  }
}
