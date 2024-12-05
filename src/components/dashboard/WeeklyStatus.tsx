// src/components/dashboard/WeeklyStatus.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { walletStore } from '@/store/walletStore';

interface WeeklyStatusProps {
  categories: {
    earnings: Category[];
    spends: Category[];
  };
  onTransaction: (type: 'earn' | 'spend', category: any) => void;
}

const WeeklyStatus = ({ categories, onTransaction }) => {
  console.log('Categories received:', categories);

  const calculateProgress = (category: any, type: 'earn' | 'spend') => {
    console.log('Category passed to calculateProgress:', category);
    
    if (!category || !category.id) {
      console.error('Invalid category:', category);
      return 0;
    }

    console.log('Category ID being used:', category.id);
    
    const transactions = walletStore.getTransactions();
    console.log('All transactions:', transactions);

    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setHours(0, 0, 0, 0);  // Set to beginning of day
    weekStart.setDate(now.getDate() - now.getDay());  // Go back to Sunday
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7); 

    console.log('Week range:', {
        start: weekStart.toLocaleString(),
        end: weekEnd.toLocaleString()
    });
   
    
    const categoryTransactions = transactions.filter(t => {

        const transactionDate = new Date(t.timestamp);
        const isThisWeek = transactionDate >= weekStart && transactionDate < weekEnd; 
       
        console.log('Comparing IDs:', { 
            transactionId: t.categoryId,
            categoryId: category.id,
            type: t.type,
            type2: type,
            isThisWeek,
            matches: t.categoryId === category.id && t.type === type
        });
        return t.categoryId === category.id && t.type === type && isThisWeek;
    });
    
    console.log('Filtered transactions:', categoryTransactions);
    return categoryTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>This Week's Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Earnings Section */}
        <div className="space-y-4">
          {categories.earnings.filter(cat => !cat.archived).map(category => {
	    console.log('Processing category:', category);
            const progress = calculateProgress(category, 'earn');
            console.log('Calculated amount:', progress);
            return (
              <div key={category.id} className="border-l-2 border-green-200 pl-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 text-sm">{category.name}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-7 text-xs border-green-200 text-green-600 hover:bg-green-50"
                      onClick={() => onTransaction('earn', category)}
                    >
                      💰 Make a deposit
                    </Button>
                  </div>
                  <span className="text-green-600 text-sm">
                    {progress}/{category.target} {category.unit}
                  </span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-1.5">
                  <div 
                    className="bg-green-400 h-1.5 rounded-full"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Spends Section */}
        <div className="space-y-4">
          {categories.spends.filter(cat => !cat.archived).map(category => {
            console.log('Processing category:', category);
            const progress = calculateProgress(category, 'spend');
            console.log('Calculated amount:', progress);
            const remaining = category.target - progress;
            return (
              <div key={category.id} className="border-l-2 border-blue-200 pl-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 text-sm">{category.name}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-7 text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => onTransaction('spend', category)}
                    >
                      Cash in
                    </Button>
                  </div>
                  <span className="text-blue-600 text-sm">
                    {remaining}/{category.target} remaining
                  </span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-1.5">
                  <div 
                    className="bg-blue-400 h-1.5 rounded-full"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyStatus;