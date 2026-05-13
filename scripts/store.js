/** Saves any value as a JSON string to the browser's localstorage */
export function saveToLocalStorage(keyString, value) {
  localStorage.setItem(keyString, JSON.stringify(value));
}

/** Retrieves a value by its key from localstorage and parses it into a object */
export function getFromLocalStorage(keyString) {
  const data = JSON.parse(localStorage.getItem(keyString));
  return data;
}