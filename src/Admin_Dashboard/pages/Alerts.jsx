// pages/Alerts.js
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle, Bell } from 'lucide-react';

const Alerts = () => {
  const [alerts] = useState([
    {
      id: 1,
      type: 'error',
      title: 'System Error',
      message: 'Database connection failed',
      timestamp: '2024-01-21 10:30 AM',
      status: 'Unresolved'
    },
    {
      id: 2,
      type: 'warning',
      title: 'High CPU Usage',
      message: 'Server CPU usage exceeded 90%',
      timestamp: '2024-01-21 09:15 AM',
      status: 'In Progress'
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      message: 'System backup completed successfully',
      timestamp: '2024-01-21 08:00 AM',
      status: 'Resolved'
    },
    {
      id: 4,
      type: 'info',
      title: 'System Update',
      message: 'New update available',
      timestamp: '2024-01-21 07:45 AM',
      status: 'Pending'
    }
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return <XCircle className="text-red-500" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'info':
        return <Info className="text-blue-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Unresolved: 'bg-red-100 text-red-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      Resolved: 'bg-green-100 text-green-800',
      Pending: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">System Alerts</h2>
        <div className="flex gap-4">
          <select className="border rounded-lg px-4 py-2">
            <option value="all">All Alerts</option>
            <option value="error">Errors</option>
            <option value="warning">Warnings</option>
            <option value="success">Success</option>
            <option value="info">Info</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Bell size={16} />
            Configure Alerts
          </button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Alerts</h3>
          <p className="text-3xl font-bold text-gray-800">{alerts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Unresolved</h3>
          <p className="text-3xl font-bold text-red-600">
            {alerts.filter(a => a.status === 'Unresolved').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {alerts.filter(a => a.status === 'In Progress').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Resolved</h3>
          <p className="text-3xl font-bold text-green-600">
            {alerts.filter(a => a.status === 'Resolved').length}
          </p>
        </div>
      </div>

      {/* Alert List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left">Alert</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.id} className="border-b">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-gray-500">{alert.message}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize">{alert.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(alert.status)}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {alert.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alerts;