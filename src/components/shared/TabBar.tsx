// src/components/shared/TabBar.tsx
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings } from "lucide-react";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="max-w-md mx-auto flex justify-around">
        <Button 
          variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
          className="flex-1 rounded-none h-14 gap-2"
          onClick={() => onTabChange('dashboard')}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Button>
        <Button 
          variant={activeTab === 'settings' ? 'default' : 'ghost'}
          className="flex-1 rounded-none h-14 gap-2"
          onClick={() => onTabChange('settings')}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Button>
      </div>
    </div>
  );
};

export default TabBar;