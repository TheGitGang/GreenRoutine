export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
};