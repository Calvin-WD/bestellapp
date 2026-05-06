export function saveToLocalStorage(keyString, value) {
  localStorage.setItem(keyString, JSON.stringify(value));
}

export function getFromLocalStorage(keyString) {
  const data = JSON.parse(localStorage.getItem(keyString));
  return data;
}