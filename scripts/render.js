import {
  calculateBasketSubTotal,
  calculateBasketTotal,
  getBasketAsArray,
  getBasketLength,
  isBasketEmpty,
  isDishInBasket,
} from "./basket.js";
import { BASKET_DESKTOP_PREFIX, BASKET_MOBILE_PREFIX } from "./constants.js";
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

let timeOutId = 0;

/** Renders the categories section by inserting the generated HTML into the DOM */
export function renderCategories(menu) {
  const catWrapperRef = document.getElementById("catWrapper-id");
  catWrapperRef.innerHTML = getCatWrapperHtml(menu);
}

/** Generates the complete HTML string for all categories and their dishes */
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

/** Renders the desktop basket into the DOM */
export function renderBasket(basket) {
  const basketWrapperRef = document.getElementById("basketWrapper-id");

  basketWrapperRef.innerHTML = getBasketWrapperHtml(basket, BASKET_DESKTOP_PREFIX);
}

/** Renders the mobile basket into the DOM */
export function renderMobileBasket(basket) {
  const mobileBasketWrapperRef = document.getElementById(
    "mobileBasketWrapper-id",
  );

  mobileBasketWrapperRef.innerHTML = getBasketWrapperHtml(basket, BASKET_MOBILE_PREFIX);
}

/** Opens the desktop basket by adjusting CSS classes */
export function openBasket() {
  const basketRef = document.getElementById(BASKET_DESKTOP_PREFIX + "-basket-id");

  basketRef.classList.remove("basket__close");
  basketRef.classList.add("basket__open");
}

/** Closes the desktop basket by adjusting CSS classes */
export function closeBasket() {
  const basketRef = document.getElementById(BASKET_DESKTOP_PREFIX + "-basket-id");

  basketRef.classList.remove("basket__open");
  basketRef.classList.add("basket__close");
}

/** Opens the order dialog and automatically closes it after 4 seconds */
export function openDialog() {
  const dialogRef = document.getElementById("dialog-id");

  dialogRef.showModal();
  timeOutId = setTimeout(closeDialog, 4000);
}

/** Toggles the visibility (open/close) of the mobile basket */
export function openMobileBasketToggle() {
  const mobileBasketRef = document.getElementById("mobileBasketWrapper-id");

  mobileBasketRef.classList.toggle("basketMobile__open");
}

/** Closes the mobile basket and updates its content */
export function closeMobileBasket(basket) {
  const mobileBasketRef = document.getElementById("mobileBasketWrapper-id");

  mobileBasketRef.classList.remove("basketMobile__open");
  renderMobileBasket(basket);
}

/** Closes the order dialog (modal) and clears the running timeout */
export function closeDialog() {
  const dialogRef = document.getElementById("dialog-id");

  dialogRef.close();
  clearTimeout(timeOutId);
}

/** Generate the html string for an array of dishes.
 * computing dynamic button states based on the current basket.
 */
function getDishesHtml(dishes) {
  let dishesHtml = "";
  for (let indexDishes = 0; indexDishes < dishes.length; indexDishes++) {
    const currentDish = dishes[indexDishes];
    // let isInBasket = false;
    let isInBasket = isDishInBasket(currentDish.id);

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

/** Generates the wrapping HTML string for the basket including dynamic classes */
function getBasketWrapperHtml(basket, basketIdPrefix) {
  const scrollClass = getBasketLength() > 3 ? "oFlowYscroll" : "";
  const basketTotal = calculateBasketTotal();
  const buyButtonClassDnone = isBasketEmpty() ? " dNone" : "";

  return getBasketTemplate(
    basketIdPrefix,
    basketTotal,
    getBasketDishesHtml(basket),
    getBasketPriceHtml(basket),
    scrollClass,
    buyButtonClassDnone,
  );
}

/** Generate the html string for an array of dishes for the basket.
 * computing dynamic button states based on the current basket.
 */
function getBasketDishesHtml(basket) {
  let basketDishesFullHtml = "";

  if (isBasketEmpty()) {
    return getBasketDishEmptyTemplate();
  } else {
    const basketArray = getBasketAsArray();
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

/** returns the basket price html string whether basket its empty or not */
function getBasketPriceHtml(basket) {
  if (isBasketEmpty()) {
    return getBasketPriceEmptyTemplate();
  } else {
    const subTotal = calculateBasketSubTotal();
    const total = calculateBasketTotal();
    return getBasketPriceTemplate(subTotal, total);
  }
}
/** create an basket dish object with the information what the basket needs */
function createBaskteDish(dish, dishAmount) {
  let basketDish = {
    name: dish.name,
    price: dish.price,
    id: dish.id,
    amount: dishAmount,
  };
  return basketDish;
}
