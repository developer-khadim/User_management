import React from "react";
import Dashboard from "./Pages/DashboardPage";
import Media from "./Pages/MediaPage";
import Notifications from "./Pages/NotificationsPage";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
// import Calendar from "./Pages/Calendar";

const MainContent = ({ activeItem }) => {
  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Media":
        return <Media />;
      case "Notifications":
        return <Notifications />;
      case "Settings":
        return <Settings />;
      case "Profile":
      return <Profile/>;
      // case "Calendar":
      // return <Calendar/>;
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
