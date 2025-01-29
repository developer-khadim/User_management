// components/NavItem.js
import React from 'react';

const NavItem = ({ item, isActive, onClick }) => (
  <a
    href={item.href}
    className={`flex items-center p-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'hover:bg-gray-100 text-gray-700'
    }`}
    onClick={(e) => {
      e.preventDefault(); // Prevent page navigation for SPA behavior
      onClick(); // Call the onClick handler
    }}
    aria-current={isActive ? 'page' : undefined} // Add ARIA for accessibility
  >
    {item.icon}
    <span className="ml-3">{item.title}</span>
  </a>
);

export default NavItem;
