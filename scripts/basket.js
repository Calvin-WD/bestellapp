export function addToBasket(dishId) {
  const dish = getDishFromDatabase(dishId);
  basket.dishes.push(dish);

  saveToLocalStorage(BASKET, basket.dishes);
}

export function getDishFromDatabase(dishId) {
  let dish = "";

  for (let indexCat = 0; indexCat < menu.categories.length; indexCat++) {
    dish = menu.categories[indexCat].dishes.filter(
      (element) => element.id == dishId,
    );

    if (dish.length != 0) {
      return dish;
    }
  }
  return;
}