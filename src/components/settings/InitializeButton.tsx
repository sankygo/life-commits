// src/components/settings/InitializeButton.tsx
import { Button } from "@/components/ui/button";
import { walletStore } from '@/store/walletStore';

const InitializeButton = () => {
  const handleInitialize = () => {
    const testData = {
      earnings: [
        { id: 1, name: 'Coding Practice', type: 'duration', target: 5, unit: 'hours', archived: false },
        { id: 2, name: 'Reading', type: 'duration', target: 3, unit: 'hours', archived: false }
      ],
      spends: [
        { id: 3, name: 'Eating Out', type: 'instance', target: 3, unit: 'times', archived: false },
        { id: 4, name: 'Movies', type: 'instance', target: 2, unit: 'times', archived: false }
      ]
    };

    walletStore.saveCategories(testData);
    walletStore.saveTransaction([]); // Reset transactions
    window.location.reload(); // Refresh to see changes
  };

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="space-y-2">
      <Button 
        onClick={handleInitialize}
        className="w-full"
      >
        Initialize Test Data
      </Button>
      <Button 
        onClick={handleReset}
        variant="destructive"
        className="w-full"
      >
        Reset All Data
      </Button>
    </div>
  );
};

export default InitializeButton;