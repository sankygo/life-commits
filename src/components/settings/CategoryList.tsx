// src/components/settings/CategoryList.tsx
import { Button } from "@/components/ui/button";
import { RefreshCw, Archive } from "lucide-react";
import { walletStore } from '@/store/walletStore';

interface CategoryListProps {
  categories: any[];
  type: string;
  showArchived: boolean;
}

const CategoryList = ({ categories, type, showArchived }: CategoryListProps) => {


  const handleArchiveCategory = (categoryId: number) => {
    console.log('Attempting to archive category:', categoryId);
    
    const updatedCategories = walletStore.getCategories();
    console.log('Current categories:', updatedCategories);

    // Update the archived status in the correct section
    const updatedSection = updatedCategories[type].map(cat => 
      cat.id === categoryId ? { ...cat, archived: true } : cat
    );
    
    updatedCategories[type] = updatedSection;
    
    console.log('Updated categories:', updatedCategories);
    walletStore.saveCategories(updatedCategories);
    
    // Force refresh to see changes
    window.location.reload();
  };  

  return (
    <div className="space-y-3">
      {categories
        .filter(cat => cat.archived === showArchived)
        .map(category => (
          <div key={category.id} 
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <div className="font-medium">{category.name}</div>
              <div className="text-sm text-gray-500">
                Target: {category.target} {category.unit} per week
              </div>
            </div>
            <div className="text-xs px-2 py-1 bg-gray-200 rounded">
              {category.type === 'duration' ? 'Duration' : 'Instance'} based
            </div>
            <Button 
  variant="ghost" 
  size="icon"
  className="text-gray-500 hover:text-gray-700"
  onClick={() => handleArchiveCategory(category.id)}
>
  {showArchived ? 
    <RefreshCw className="h-4 w-4" /> : 
    <Archive className="h-4 w-4" />
  }
</Button>
          </div>
        ))}
    </div>
  );
};

export default CategoryList;