// src/components/dashboard/WalletBalance.tsx
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { walletStore } from '@/store/walletStore';
import { useState, useEffect } from 'react';

interface WalletBalanceProps {
  stats: {
    totalBalance: number;
    weeklyChange: number;
    startDate: string;
    breakdown: {
      totalEarnings: number;
      negativeSpends: number;
    };
  };
}

const WalletBalance = () => {
  // Get current stats
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(walletStore.getWalletStats());
  }, []);

  if (!stats) return null; // or loading spinner


  // Format currency with commas
  const formatNumber = (num: number) => num.toLocaleString();

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Balance */}
          <div>
            <div className="text-sm text-purple-200">Total Balance</div>
            <div className="text-3xl font-bold">{formatNumber(stats.totalBalance)} pts</div>
          </div>
          
          {/* Weekly Change */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1">
              {stats.weeklyChange >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-300" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-300" />
              )}
              <span className={stats.weeklyChange >= 0 ? 'text-green-300' : 'text-red-300'}>
                {stats.weeklyChange >= 0 ? '+' : ''}{formatNumber(stats.weeklyChange)} this week
              </span>
            </div>
            <div className="text-purple-200">
              Since {formatDate(stats.startDate)}
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-purple-200 text-sm">Total Earnings</div>
              <div className="text-lg font-semibold">
                +{formatNumber(stats.breakdown.totalEarnings)}
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-purple-200 text-sm">Negative Spends</div>
              <div className="text-lg font-semibold">
                {formatNumber(stats.breakdown.negativeSpends)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletBalance;