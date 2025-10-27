import { User } from './api';

const USER_STORAGE_KEY = 'rental_user';

export const authStorage = {
  setUser: (user: User) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  clearUser: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!authStorage.getUser();
  },
};
