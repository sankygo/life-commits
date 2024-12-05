// src/store/categories.ts
import { Category } from '../types';

const STORAGE_KEY = 'wallet-categories';

export const getCategories = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialCategories;
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};