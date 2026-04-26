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

import { menu } from "../scripts/db.js";
import { changeButtonState } from "./basket.js";

export function renderCategories() {
  const catWrapperRef = document.getElementById("catWrapper-id");
  catWrapperRef.innerHTML = getCatWrapperHtml();
}

export function renderBasket(basket) {
  const basketWrapperRef = document.getElementById("basketWrapper-id");

  basketWrapperRef.innerHTML = getBasketWrapperHtml(basket, basket.dishes);
}

export function renderBasketSummery(basket) {
  const basketSummeryRef = document.getElementById("basketPrice-id");
  basketSummeryRef.innerHTML = getBasketPriceHtml(basket);
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

    dishesHtml += getDishTemplate(currentDish);
  }
  return dishesHtml;
}

function getBasketWrapperHtml(basket, basketDishes) {
  return getBasketTemplate(
    getBasketDishesHtml(basketDishes),
    getBasketPriceHtml(basket),
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
      basketDishesFullHtml += getBasketDishTemplate(currentBasketDish);
      if (currentBasketDish.amount >= 1) {
        changeButtonState(document.getElementById("buttonAddToBasket-id" + currentBasketDish.id));
      }
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
