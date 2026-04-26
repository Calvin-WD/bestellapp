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

export function getDishTemplate(dish) {
  return `<article id="dish-${dish.id}" class="dish">
      <img id="dishImage-${dish.id}" class="dish__image" src="${dish.image}" alt="Burger-${dish.id}">
      <div id="dishDescription-${dish.id}" class="dish__descriptionContainer">
        <div class="dish__description">
          <h3>${dish.name}</h3>
          <p>${dish.description}</p>
          </div>
          <div class="dish__price">
            <p>${dish.price} €</p>
            <button type="button" class="button" onclick="addToBasket(${dish.id})">Hinzufügen</button>
          </div>
      </div>
    </article>`;
}

export function getBasketTemplate(basketDishesHtml, basketPriceHtml) {
  return `<article class="basket">
        <h2>Dein Warenkorb</h2>
        <section id="basketDishes-id" class="basket__dishesContainer">
          ${basketDishesHtml}
        </section>
        <section id="basketPrice-id" class="basket__priceContainer">
         ${basketPriceHtml}
         </section>
      </article>`;
  }

export function getBasketDishEmptyTemplate() {
  return `<p>Noch nichts im Warenkorb.</p>
        <p>Suche Die etwas leckeres aus!</p>`;
}

export function getBasketDishTemplate(basketDish) {
  return `<div class="basket__dish">
            <p>${basketDish.name}</p>
            <div class="basket__dishPriceContainter">
              <p>Zahl</p>
              <p>Button</p>
            </div>
          </div>`;
}

export function getBasketPriceEmptyTemplate() {
  return `<img
          src="./assets/icon/shopping_cart.svg"
          alt="Ein Warenkorb"
          class="basket__image"
        />`;
}

export function getBasketPriceTemplate(basket) {
  return `<table class="basket__table">
            <tr>
              <td>Subtotal</td>
              <td>55</td>
            </tr>
            <tr>
              <td>Delivery Fee</td>
              <td>4,99</td>
            </tr>
            <tr>
              <th>Total</th>
              <th>59,99</th>
            </tr>
          </table>`;
}
