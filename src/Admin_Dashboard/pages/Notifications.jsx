// pages/Notifications.js
import React, { useState } from 'react';
import { Bell, MailOpen, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'System Update',
      message: 'System maintenance scheduled for tonight at 2 AM',
      time: '10 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new reporting dashboard',
      time: '1 hour ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      message: 'Weekly backup has been completed successfully',
      time: '2 hours ago',
      read: false,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="text-red-500" size={20} />;
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'info':
        return <Info className="text-blue-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      case 'low':
        return 'border-l-4 border-green-500';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Notifications</p>
              <p className="text-2xl font-bold">{notifications.length}</p>
            </div>
            <Bell className="text-gray-400" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unread</p>
              <p className="text-2xl font-bold">
                {notifications.filter(n => !n.read).length}
              </p>
            </div>
            <MailOpen className="text-gray-400" size={24} />
          </div>
        </div>
      </div>

      {/* Notification Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
              All
            </button>
            <button className="px-4 py-2 hover:bg-gray-50 text-gray-600 rounded-lg text-sm font-medium">
              Unread
            </button>
            <button className="px-4 py-2 hover:bg-gray-50 text-gray-600 rounded-lg text-sm font-medium">
              High Priority
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 hover:bg-gray-50 ${getPriorityClass(notification.priority)} ${
                notification.read ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;