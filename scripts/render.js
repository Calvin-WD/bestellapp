/** import the javascript modules*/
import {
  getBasketDishEmptyTemplate,
  getBasketDishTemplate,
  getBasketPriceEmptyTemplate,
  getBasketPriceTemplate,
  getBasketTemplate,
  getCategoryTemplate,
  getDishTemplate,
} from "../scripts/template.js";

import { checkIfDishIsInBasket, basket } from "./basket.js";
import { menu } from "./db.js";

export function renderCategories() {
  const catWrapperRef = document.getElementById("catWrapper-id");
  catWrapperRef.innerHTML = getCatWrapperHtml();
}

export function renderBasket(basket) {
  const basketWrapperRef = document.getElementById("basketWrapper-id");

  basketWrapperRef.innerHTML = getBasketWrapperHtml(basket, basket.dishes);
}

function getCatWrapperHtml() {
  let catWrapperHtmlString = "";

  for (let indexCat = 0; indexCat < menu.categories.length; indexCat++) {
    const currentCat = menu.categories[indexCat];
    const dishesHtml = getDishHtml(currentCat.dishes);

    catWrapperHtmlString += getCategoryTemplate(
      indexCat,
      currentCat.name,
      dishesHtml,
    );
  }
  return catWrapperHtmlString;
}

function getDishHtml(dishes) {
  let dishesHtml = "";
  for (let indexDishes = 0; indexDishes < dishes.length; indexDishes++) {
    const currentDish = dishes[indexDishes];
    let isInBasket = checkIfDishIsInBasket(currentDish);

    const buttonText = isInBasket ? "Im Warenkorb" : "Hinzufügen";
    const buttonClass = isInBasket ? " button--added" : "";
    const buttonState = isInBasket ? "disabled" : "";

    dishesHtml += getDishTemplate(
      currentDish,
      buttonText,
      buttonClass,
      buttonState,
    );
  }
  return dishesHtml;
}

function getBasketWrapperHtml(basket, basketDishes) {
  const scrollClass = basket.dishes.length > 3 ? "oFlowYscroll" : "";

  return getBasketTemplate(
    getBasketDishesHtml(basketDishes),
    getBasketPriceHtml(basket),
    scrollClass,
  );
}

function getBasketDishesHtml(basketDishes) {
  let basketDishesFullHtml = "";

  if (basketDishes.length == 0) {
    return getBasketDishEmptyTemplate();
  } else {
    for (
      let indexBasketDish = 0;
      indexBasketDish < basketDishes.length;
      indexBasketDish++
    ) {
      const currentBasketDish = basketDishes[indexBasketDish];
      const deleteButtonUpper = currentBasketDish.amount <= 1 ? "dNone" : "";
      const deleteButtonLower = currentBasketDish.amount > 1 ? "dNone" : "";
      const quantitySubButton = currentBasketDish.amount <= 1 ? "dNone" : "";
      basketDishesFullHtml += getBasketDishTemplate(
        currentBasketDish,
        deleteButtonUpper,
        deleteButtonLower,
        quantitySubButton
      );
    }
    return basketDishesFullHtml;
  }
}

function getBasketPriceHtml(basket) {
  if (basket.subTotal == 0) {
    return getBasketPriceEmptyTemplate();
  } else {
    return getBasketPriceTemplate(basket);
  }
}
