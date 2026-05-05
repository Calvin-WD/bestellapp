import { menu } from "./scripts/db.js";
import { renderCategories } from "./scripts/render.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  renderCategories(menu);
  
}