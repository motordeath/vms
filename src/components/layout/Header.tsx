import React from 'react';
import { Bell, Moon, Sun, Search } from 'lucide-react';
import { alerts } from '../../data/mockData';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const unreadAlerts = alerts.filter(alert => !alert.read).length;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Actual theme implementation would go here
  };

  return (
    <header className="bg-[#2d3d32] py-4 px-6 flex items-center justify-between shadow-md mb-6">
      <div className="flex-1">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search vehicles, drivers, trips..."
            className="custom-input w-full pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-[#a3b18a]" size={18} />
        </div>
      </div>
      
      <div className="flex items-center space-x-5">
        <div className="relative">
          <button className="text-[#dad7cd] hover:text-white transition-colors">
            <Bell size={20} />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadAlerts}
              </span>
            )}
          </button>
        </div>
        
        <button 
          className="text-[#dad7cd] hover:text-white transition-colors"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#588157] flex items-center justify-center text-white font-semibold">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;