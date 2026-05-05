import { getCategoryTemplate, getDishTemplate } from "./template.js";

/** Renders the cateories section by setting the full html into the DOM */
export function renderCategories(menu) {
  const catWrapperRef = document.getElementById("catWrapper-id");
  catWrapperRef.innerHTML = getCatWrapperHtml(menu);
}

/** Returns the complete html with all the categories and their dishes */
function getCatWrapperHtml(menu) {
  let catWrapperHtmlString = "";

  for (let indexCat = 0; indexCat < menu.categories.length; indexCat++) {
    const currentCat = menu.categories[indexCat];
    const dishesHtml = getDishesHtml(currentCat.dishes);

    catWrapperHtmlString += getCategoryTemplate(
      indexCat,
      currentCat.name,
      dishesHtml,
    );
  }
  return catWrapperHtmlString;
}

/** Generate the html string for an array of dishes.
 * computing dynamic button states based on the current basket.
 */
function getDishesHtml(dishes) {
  let dishesHtml = "";
  for (let indexDishes = 0; indexDishes < dishes.length; indexDishes++) {
    const currentDish = dishes[indexDishes];
    let isInBasket = false;
    // let isInBasket = checkIfDishIsInBasket(currentDish);

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
