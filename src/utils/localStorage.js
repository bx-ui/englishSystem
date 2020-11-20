export function getStorage(item) {
  const data =
    localStorage.getItem(item) && JSON.parse(localStorage.getItem(item));
  return data;
}

export function setStorage(item, value) {
  localStorage.setItem(item, JSON.stringify(value));
}
