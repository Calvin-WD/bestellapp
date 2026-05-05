/** Returns the html of the categories framework.
 * Is ready to add the html for the dishes.
 */
export function getCategoryTemplate(indexCat, nameCat, dishesHtml) {
  return `<article class="category">
      <header id="categoryHeader-${indexCat}" class="category__header">
        <h2>${nameCat}</h2>
      </header>
      <main id="dishesHtmlContainer-${indexCat}" class="category__main">
      ${dishesHtml}
      </main>
    </article>`;
}

/** Returns the html for the dish */
export function getDishTemplate(dish, buttonText, buttonClass, buttonState) {
  return `<article id="dish-${dish.id}" class="dish">
      <img id="dishImage-${dish.id}" class="dish__image" src="${dish.image}" alt="Burger-${dish.id}">
      <div id="dishDescription-${dish.id}" class="dish__descriptionContainer">
        <div class="dish__description">
          <h3>${dish.name}</h3>
          <p>${dish.description}</p>
          </div>
          <div class="dish__price">
            <p>${dish.price.toFixed(2)}€</p>
            ${getAddToBasketButtonTemplate(dish, buttonText, buttonClass, buttonState)}
          </div>
      </div>
    </article>`;
}

export function getBasketTemplate(
  basket,
  basketDishesHtml,
  basketPriceHtml,
  scrollClass,
) {
  return `<article class="basket">
        <header>
          <h2>Your Basket</h2>
        </header>
        <main class="basket__main">
          <section id="basketDishes-id" class="basket__dishesContainer ${scrollClass}">
          ${basketDishesHtml}
          </section>
          <section class="basket__priceContainer">
          ${basketPriceHtml}
          </section>
        </main>
        <footer class="basket__footer">
        ${getBuyButtonTemplate(basket)}
        </footer>
      </article>`;
}

export function getBasketDishEmptyTemplate() {
  return `<div class="basket_emptyDishesContainer">
            <p>Nothing here yet.</p>
            <p>Go ahead and choose something delicious!</p>
          </div>`;
}

export function getBasketPriceEmptyTemplate() {
  return `<img
          src="./assets/icon/shopping_cart.svg"
          alt="a basket"
          class="basket__image"
        />`;
}

/** Returns the html for the button for adding the dish to the basket. */
function getAddToBasketButtonTemplate(dish, buttonText, buttonClass, buttonState) {
  return `<button
            id="buttonAddToBasket-id${dish.id}"
            type="button"
            class="button${buttonClass}"
            ${buttonState}
            onclick="addToBasket(${dish.id}, this, 'append')">
            ${buttonText}
          </button>`;
}

function getBuyButtonTemplate(basket) {
  return `<button
          id="buyNowButton-id"
          type="button"
          class="button button--buyNow"
          onclick="buyNow()">
            Buy now (${basket}€)
          </button>`;
}