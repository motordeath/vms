import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  History, 
  BarChart, 
  Settings, 
  Users,
  AlertTriangle,
  Menu,
  X,
  Car
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/tracking', icon: <MapPin size={20} />, label: 'Live Tracking' },
    { path: '/history', icon: <History size={20} />, label: 'Trip History' },
    { path: '/analytics', icon: <BarChart size={20} />, label: 'Analytics' },
    { path: '/vehicles', icon: <Car size={20} />, label: 'Vehicles' },
    { path: '/drivers', icon: <Users size={20} />, label: 'Drivers' },
    { path: '/alerts', icon: <AlertTriangle size={20} />, label: 'Alerts' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="lg:hidden fixed top-5 left-5 z-50 bg-[#344e41] p-2 rounded-md"
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`sidebar fixed h-full z-50 lg:relative
                    ${collapsed ? 'w-20' : 'w-64'} 
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 transition-all duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between py-6 px-4 border-b border-[#3a5a40]">
            {!collapsed && (
              <h1 className="text-xl font-bold text-[#dad7cd] truncate">
                Smart Vehicle<br />Monitoring
              </h1>
            )}
            {collapsed && (
              <span className="mx-auto text-xl font-bold">SVMS</span>
            )}
            <button 
              className="hidden lg:block text-[#a3b18a] hover:text-[#dad7cd]"
              onClick={toggleSidebar}
            >
              {collapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-6 px-2 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `
                      flex items-center py-3 px-4 rounded-md transition-colors
                      ${isActive ? 'active-nav-link' : 'text-[#a3b18a] hover:bg-[#3a5a40]/40'}
                    `}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User */}
          <div className="p-4 border-t border-[#3a5a40]">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#588157] flex items-center justify-center text-white font-semibold">
                AD
              </div>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-[#a3b18a]">admin@svms.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;