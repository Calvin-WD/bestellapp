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