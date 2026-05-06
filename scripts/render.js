import { getDishById } from "./db.js";
import {
  getCategoryTemplate,
  getDishTemplate,
  getBasketTemplate,
  getBasketDishEmptyTemplate,
  getBasketPriceEmptyTemplate,
  getBasketDishTemplate,
  getBasketPriceTemplate,
} from "./templates.js";

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

    const buttonText = isInBasket ? "Added" : "Add to basket";
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

export function renderBasket(basket) {
  const basketWrapperRef = document.getElementById("basketWrapper-id");

  basketWrapperRef.innerHTML = getBasketWrapperHtml(basket);
}

function getBasketWrapperHtml(basket) {
  const scrollClass = Object.keys(basket).length > 3 ? "oFlowYscroll" : "";

  return getBasketTemplate(
    basket,
    getBasketDishesHtml(basket),
    getBasketPriceHtml(basket),
    scrollClass,
  );
}

function getBasketDishesHtml(basket) {
  let basketDishesFullHtml = "";
  const basketArray = Object.entries(basket);

  if (basketArray.length === 0) {
    return getBasketDishEmptyTemplate();
  } else {
    for (let indexBasket = 0; indexBasket < basketArray.length; indexBasket++) {
      const dishId = basketArray[indexBasket][0];
      const dishAmount = basketArray[indexBasket][1];
      const dish = getDishById(dishId);

      const basketDish = createBaskteDish(dish, dishAmount);

      const deleteButtonUpper = basketDish.amount <= 1 ? "dNone" : "";
      const deleteButtonLower = basketDish.amount > 1 ? "dNone" : "";
      const quantitySubButton = basketDish.amount <= 1 ? "dNone" : "";

      basketDishesFullHtml += getBasketDishTemplate(
        basketDish,
        deleteButtonUpper,
        deleteButtonLower,
        quantitySubButton,
      );
    }
    return basketDishesFullHtml;
  }
}

function getBasketPriceHtml(basket) {
  if (Object.keys(basket).length === 0) {
    return getBasketPriceEmptyTemplate();
  } else {
    return getBasketPriceTemplate(basket);
  }
}

function createBaskteDish(dish, dishAmount) {
  let basketDish = {
    name: dish.name,
    price: dish.price,
    id: dish.id,
    amount: dishAmount,
  };
  return basketDish;
}
