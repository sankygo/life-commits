// src/components/dashboard/Dashboard.tsx
import WalletBalance from './WalletBalance';
import WeeklyStatus from './WeeklyStatus';
import TransactionModal from './TransactionModal';
import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { walletStore } from '@/store/walletStore';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'earn' | 'spend' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    console.log('Dashboard loading categories:', walletStore.getCategories());
    setCategories(walletStore.getCategories());
    setStats(walletStore.getWalletStats());
  }, []);


  // Handler functions
  const handleTransaction = (type: 'earn' | 'spend', category: any) => {
    setTransactionType(type);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (data: any) => {
    console.log('Selected Category:', selectedCategory); 
    const transaction = {
      id: Date.now(),
      categoryId: selectedCategory.id,
      amount: parseInt(data.amount),
      description: data.description,
      timestamp: new Date().toISOString(),
      type: transactionType
    };

    console.log('Saving transaction:', transaction); // Debug log
    walletStore.saveTransaction(transaction);

    // See what's in localStorage after saving
    console.log('All transactions:', walletStore.getTransactions());

    // Refresh data after saving
    setStats(walletStore.getWalletStats());
    setCategories(walletStore.getCategories());
    setIsModalOpen(false);

    // Force refresh
    //window.location.reload();
  };


  if (!stats || !categories) return null; // or a loading spinner



  return (
    <div className="space-y-6">
      <WalletBalance stats={stats} />
      <WeeklyStatus 
        categories={categories}
        onTransaction={handleTransaction} 
      />
      
      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={transactionType}
          category={selectedCategory}
          onSave={handleSaveTransaction}
        />
      )}
    </div>
  );
};

export default Dashboard;