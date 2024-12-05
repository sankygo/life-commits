// src/pages/index.tsx
import type { NextPage } from 'next';
import { useState } from 'react';
import TabBar from '@/components/shared/TabBar';
import Dashboard from '@/components/dashboard/Dashboard';
import Settings from '@/components/settings/Settings';

const Home: NextPage = () => {
  console.log('Rendering Home page');
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="relative min-h-screen pb-16">
      <div className="max-w-md mx-auto p-4">
        {activeTab === 'dashboard' ? (
          <Dashboard />
        ) : (
          <Settings />
        )}
      </div>
      <TabBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Home;