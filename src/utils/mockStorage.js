// src/utils/mockStorage.js
let user = null;

export const mockStorage = {
  setUser: (userData) => {
    user = userData;
  },
  getUser: () => {
    return user;
  },
  removeUser: () => {
    user = null;
  }
};
