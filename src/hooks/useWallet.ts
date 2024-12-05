// src/hooks/useWallet.ts
import { useState, useEffect } from 'react';
import { walletStore } from '@/store/walletStore';

export const useWallet = () => {
  const [stats, setStats] = useState(walletStore.getWalletStats());
  const [categories, setCategories] = useState(walletStore.getCategories());

  const refreshData = () => {
    setStats(walletStore.getWalletStats());
    setCategories(walletStore.getCategories());
  };

  const addTransaction = (transaction: any) => {
    walletStore.saveTransaction(transaction);
    refreshData();
  };

  const updateCategories = (newCategories: any) => {
    walletStore.saveCategories(newCategories);
    setCategories(newCategories);
  };

  return {
    stats,
    categories,
    addTransaction,
    updateCategories,
    refreshData
  };
};