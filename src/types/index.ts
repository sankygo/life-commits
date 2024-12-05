// src/types/index.ts
export interface Category {
  id: number;
  name: string;
  type: 'duration' | 'instance';
  target: number;
  unit: string;
  archived: boolean;
  current?: number;
  used?: number;
}

export interface WalletStats {
  totalBalance: number;
  weeklyChange: number;
  startDate: string;
  breakdown: {
    totalEarnings: number;
    negativeSpends: number;
  };
}