import { menu } from "./scripts/db.js";
import { getBasket } from "./scripts/basket.js"
import { renderBasket, renderCategories } from "./scripts/render.js";

document.addEventListener("DOMContentLoaded", init);



function init() {
  renderCategories(menu);
  renderBasket(getBasket());
}