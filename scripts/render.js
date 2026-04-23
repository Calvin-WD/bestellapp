/** import the javascript modules*/
import { getCategoryTemplate, getDishTemplate } from "../scripts/template.js";

import { menu } from "../scripts/db.js";

export function renderCategories() {
  const catWrapperRef = document.getElementById("catWrapper-id");
  catWrapperRef.innerHTML = getCatWrapperHtml();
}

export function getCatWrapperHtml() {
  let catWrapperHtmlString = "";

  for (let indexCat = 0; indexCat < menu.categories.length; indexCat++) {
    const currentCat = menu.categories[indexCat];
    const dishesHtml = getDishHtml(currentCat.dishes);

    catWrapperHtmlString += getCategoryTemplate(indexCat, currentCat.name, dishesHtml);
  }
  return catWrapperHtmlString;
}

export function getDishHtml(dishes) {
  let dishesHtml = '';
  for (let indexDishes = 0; indexDishes < dishes.length; indexDishes++) {
    const currentDish = dishes[indexDishes];
    
    dishesHtml += getDishTemplate(currentDish);
  }
  return dishesHtml;
}