// src/components/settings/Settings.tsx
import { useState, useEffect } from 'react';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { walletStore } from '@/store/walletStore';
import InitializeButton from './InitializeButton';

const Settings = () => {
  const [showArchived, setShowArchived] = useState(false);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    setCategories(walletStore.getCategories());
  }, []);

  if (!categories) return null; // or loading spinner

  const handleAddCategory = (type: 'earnings' | 'spends', newCategory: any) => {
    const updatedCategories = {
      ...categories,
      [type]: [...categories[type], {
        ...newCategory,
        id: Date.now(),
        archived: false,
	current: 0
      }]
    };

    console.log('Updated categories:', updatedCategories);
    walletStore.saveCategories(updatedCategories);
    setCategories(updatedCategories);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Wallet Settings</h1>
      </div>

      {['earnings', 'spends'].map((section: 'earnings' | 'spends') => (
        <Card key={section}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{section === 'earnings' ? 'Earnings' : 'Spending'} Categories</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowArchived(!showArchived)}
              >
                {showArchived ? 'Hide' : 'Show'} Archived
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryList 
              categories={categories[section]}
              type={section}
              showArchived={showArchived}
            />
            <CategoryForm type={section} />
          </CardContent>
        </Card>
      ))}
    <InitializeButton />
    </div>
  );
};

export default Settings;