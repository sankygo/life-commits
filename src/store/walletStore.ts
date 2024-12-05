// src/store/walletStore.ts

const isClient = typeof window !== 'undefined';

interface Category {
  id: number;
  name: string;
  type: 'duration' | 'instance';
  target: number;
  unit: string;
  archived: boolean;
  current: number;
}

interface Transaction {
  id: number;
  categoryId: number;
  amount: number;
  description: string;
  timestamp: string;
  type: 'earn' | 'spend';
}

// Initial state structure




const initialState = {
  categories: {
    earnings: [] as Category[],
    spends: [] as Category[]
  },
  transactions: [] as Transaction[],
};

// Local storage keys
const STORAGE_KEYS = {
  categories: 'wallet_categories',
  transactions: 'wallet_transactions'
};

const getLocalStorage = (key: string, defaultValue: any) => {
  if (!isClient) return defaultValue;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
 };
 
 const setLocalStorage = (key: string, value: any) => {
  if (!isClient) return;
  localStorage.setItem(key, JSON.stringify(value));
 };

export const walletStore = {
 // Get data
  getCategories() {
    return getLocalStorage(STORAGE_KEYS.categories, initialState.categories);
  },

  getTransactions() {
    const stored = getLocalStorage(STORAGE_KEYS.transactions, []);
    // Filter out any empty arrays and invalid entries
    return stored.filter(t => t && typeof t === 'object' && 'id' in t);
  },

 // Save data
  saveCategories(categories: typeof initialState.categories) {
  setLocalStorage(STORAGE_KEYS.categories, categories);
 },

 saveTransaction(transaction: Transaction) {
  const transactions = this.getTransactions();
  // Filter out any empty arrays and invalid entries
  const cleanTransactions = transactions.filter(t => 
    t && typeof t === 'object' && 'id' in t
  );
  cleanTransactions.push(transaction);
  setLocalStorage(STORAGE_KEYS.transactions, cleanTransactions);
},

  // Calculate stats
  getWalletStats() {

    if (!isClient) {
      return {
        totalBalance: 0,
        weeklyChange: 0,
        startDate: new Date().toISOString(),
        breakdown: {
          totalEarnings: 0,
          negativeSpends: 0
        }
      };
    }

    const transactions = this.getTransactions();
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    
    const weeklyTransactions = transactions.filter(t => 
      new Date(t.timestamp) >= weekStart
    );

    const totalEarnings = transactions
      .filter(t => t.type === 'earn')
      .reduce((sum, t) => sum + t.amount, 0);

    const weeklyChange = weeklyTransactions.reduce((sum, t) => 
      sum + (t.type === 'earn' ? t.amount : -t.amount), 0
    );

    return {
      totalBalance: transactions.reduce((sum, t) => 
        sum + (t.type === 'earn' ? t.amount : -t.amount), 0
      ),
      weeklyChange,
      startDate: transactions[0]?.timestamp || new Date().toISOString(),
      breakdown: {
        totalEarnings,
        negativeSpends: -transactions
          .filter(t => t.type === 'spend')
          .reduce((sum, t) => sum + t.amount, 0)
      }
    };
  }
};