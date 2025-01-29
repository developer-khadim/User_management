// components/Sidebar.js
import React from 'react';
import { X } from 'lucide-react';
import NavItem from './NavItem';
import {
  User, Bell, Home, Image, Calendar,
  Settings
} from 'lucide-react';

const navItems = [
  { title: "Dashboard", icon: <Home size={18} />, href: "/" },
  { title: "Profile", icon: <User size={18} />, href: "/profile" },
  { title: "Media", icon: <Image size={18} />, href: "/media" },
  { title: "Notifications", icon: <Bell size={18} />, href: "/notifications" },
  // { title: "Calendar", icon: <Calendar size={18} />, href: "/calendar" },
  { title: "Settings", icon: <Settings size={18} />, href: "/settings" }
];

const Sidebar = ({ isOpen, toggleSidebar, activeItem, setActiveItem }) => (
  <aside
    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } bg-white border-r border-gray-200`}
  >
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
        aria-label="Close Sidebar"
      >
        <X size={20} />
      </button>
    </div>

    <nav className="p-4 space-y-2">
      {navItems.map((item) => (
        <NavItem
          key={item.title}
          item={item}
          isActive={activeItem === item.title}
          onClick={() => {
            setActiveItem(item.title);
            toggleSidebar(); // Close the sidebar
          }}
        />
      ))}
    </nav>
  </aside>
);

export default Sidebar;
