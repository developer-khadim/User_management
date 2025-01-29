import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';

const Layout = ({ children }) => {
  const location = useLocation();

  // Array of routes where navbar should be hidden
  const hiddenNavbarRoutes = ['/User_dashboard', '/Admin_dashboard'];
  const shouldHideNavbar = hiddenNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conditionally render Navbar */}
      {!shouldHideNavbar && <Navbar />}

      {/* Main content area */}
      <main
        className={`min-h-[calc(100vh-64px)] transition-all duration-300 p-8 w-full`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;

