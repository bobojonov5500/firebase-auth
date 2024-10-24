const setItem = (user) => {
  localStorage.setItem("user", user);
};
const getItem = (key) => {
  return localStorage.getItem(key);
};

const clearItem = (key) => {
  localStorage.removeItem(key);
};

export { setItem, getItem, clearItem };
