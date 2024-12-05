// src/components/settings/CategoryForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { walletStore } from '@/store/walletStore';

interface CategoryFormProps {
  type: string;
  onAdd?: (category: any) => void;
}

const CategoryForm = ({ type, onAdd }: CategoryFormProps) => {
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'duration',
    target: ''
  });

const handleSubmit = () => {
  console.log('Submitting new category:', newCategory);
  if (newCategory.name && newCategory.target) {
      const updatedCategories = walletStore.getCategories();
      console.log('Current categories:', updatedCategories);

      updatedCategories[type].push({
        ...newCategory,
        id: Date.now(),
        archived: false,
        current: 0
      });

   console.log('Updated categories:', updatedCategories);
   walletStore.saveCategories(updatedCategories);
      
      // Reset form
   setNewCategory({ name: '', type: 'duration', target: '' });

}};

  return (
    <div className="border-t pt-4 mt-4">
      <div className="space-y-3">
        <Input
          placeholder="Category name"
          value={newCategory.name}
          onChange={e => setNewCategory(prev => ({ 
            ...prev, 
            name: e.target.value 
          }))}
        />
        <div className="flex gap-2">
          <select 
            className="flex-1 border rounded-md p-2"
            value={newCategory.type}
            onChange={e => setNewCategory(prev => ({ 
              ...prev, 
              type: e.target.value 
            }))}
          >
            <option value="duration">Duration based</option>
            <option value="instance">Instance based</option>
          </select>
          <Input
            type="number"
            placeholder="Weekly target"
            className="w-32"
            value={newCategory.target}
            onChange={e => setNewCategory(prev => ({ 
              ...prev, 
              target: e.target.value 
            }))}
          />
        </div>
        <Button 
          className="w-full"
          onClick={handleSubmit}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;