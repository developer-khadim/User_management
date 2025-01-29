import React, { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import MainContent from './MainContent';
import Loader from '../Loader';

const DashboardLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');

  useEffect(() => {
    document.title = 'Admin Dashboard';
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} transition-all`}>
        <Header toggleSidebar={toggleSidebar} />
        <MainContent activeItem={activeItem} />
      </div>
    </div>
  );
};

export default DashboardLayout;
