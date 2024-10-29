const setItem = (key, user) => {
  localStorage.setItem(key, user);
};
const getItem = (key) => {
  return localStorage.getItem(key);
};

const clearItem = (key) => {
  localStorage.removeItem(key);
};

export { setItem, getItem, clearItem };
