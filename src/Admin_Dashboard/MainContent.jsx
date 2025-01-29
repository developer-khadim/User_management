import React from 'react';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import UserData from './pages/UserData';
import Tasks from './pages/Tasks';
import Reports from './pages/Reports';
import Alerts from './pages/Alerts';
import Notifications from './pages/Notifications';
import Administration from './pages/Administration';
import Settings from './pages/Settings';

const MainContent = ({ activeItem }) => {
  const renderContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return <Dashboard />;
      case 'User Management':
        return <UserManagement />;
      case 'User Data':
        return <UserData />;
      case 'Tasks':
        return <Tasks />;
      case 'Reports':
        return <Reports />;
      case 'Alerts':
        return <Alerts />;
      case 'Notifications':
        return <Notifications />;
      case 'Administration':
        return <Administration />;
      case 'Settings':
        return <Settings />;
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {activeItem}
            </h2>
            <p className="text-gray-600">
              This section is under development. Stay tuned for updates!
            </p>
          </div>
        );
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default MainContent;
