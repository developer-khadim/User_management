// components/Header.js
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ toggleSidebar }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
        </div>
        <ProfileDropdown 
          isOpen={isProfileDropdownOpen}
          toggleDropdown={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        />
        
      </div>
    </header>
  );
};

export default Header;