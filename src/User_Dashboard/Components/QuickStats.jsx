import React from "react";

const QuickStats = ({ userData }) => (
  <div className="p-4 bg-white shadow rounded-lg">
    <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
    <ul className="space-y-2">
      <li className="flex justify-between text-gray-700">
        <span>Total Logins:</span>
        <span>{userData.stats?.totalLogins || 0}</span>
      </li>
      <li className="flex justify-between text-gray-700">
        <span>Storage Used:</span>
        <span>{userData.stats?.storageUsed || "0 GB"}</span>
      </li>
      <li className="flex justify-between text-gray-700">
        <span>Active Sessions:</span>
        <span>{userData.stats?.activeSessions || 0}</span>
      </li>
    </ul>
  </div>
);

export default QuickStats;
