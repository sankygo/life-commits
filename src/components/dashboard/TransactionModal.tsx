// src/components/dashboard/TransactionModal.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Camera, X, ChevronRight } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'earn' | 'spend' | null;
  category: any;
  onSave: (data: any) => void;
}

const TransactionModal = ({ isOpen, onClose, type, category, onSave }: TransactionModalProps) => {
  const [amount, setAmount] = useState(1);
  const [description, setDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

// Prevent hydration error by ensuring the component is only rendered on the client-side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);  // This will run after the first render
  }, []);

  const handleSave = () => {
    // Play success sound
    //const audio = new Audio('/sounds/success.mp3');
    //audio.play().catch(e => console.log('Audio play failed:', e));

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onSave({ amount, description });
    }, 1000);
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {!showSuccess ? (
          <Card className="bg-white shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">
                {type === 'earn' ? 'Make a Deposit' : 'Record a Spend'}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <CardContent className="p-6 space-y-6">
              <div className="flex justify-center">
                <div className="text-7xl animate-bounce mb-4">
                  {type === 'earn' ? '💰' : '🎯'}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {category?.type === 'duration' ? 'Duration' : 'Count'}
                </label>
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setAmount(prev => Math.max(1, prev - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="text-3xl font-bold w-16 text-center">
                    {amount}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setAmount(prev => prev + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center text-sm text-gray-500">
                  {category?.unit}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Add Notes
                </label>
                <Input
                  placeholder="What did you do?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button variant="outline" className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Attach Photo
              </Button>

              <Button 
                className={`w-full ${
                  type === 'earn' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
                onClick={handleSave}
              >
                Save Entry
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center animate-in slide-in-from-bottom duration-300">
            <div className="text-8xl mb-4 animate-bounce">
              {type === 'earn' ? '🌟' : '🎉'}
            </div>
            <h3 className="text-xl font-bold mb-2">
              {type === 'earn' ? 'Great Job!' : 'Added Successfully!'}
            </h3>
            <p className="text-gray-500">
              {type === 'earn' 
                ? `You've earned ${amount} ${category?.unit}` 
                : `Recorded ${amount} ${category?.unit}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionModal;