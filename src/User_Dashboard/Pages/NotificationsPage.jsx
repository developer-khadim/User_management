import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Check, 
  X, 
  CheckCircle, 
  AlertCircle, 
  MessageCircle, 
  FileText 
} from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'success', 
      icon: <CheckCircle className="text-green-500" />, 
      title: 'File Upload Complete', 
      message: 'Your document "Report.pdf" has been successfully uploaded.', 
      time: '5 mins ago' 
    },
    { 
      id: 2, 
      type: 'alert', 
      icon: <AlertCircle className="text-yellow-500" />, 
      title: 'Storage Low', 
      message: 'You are nearing your storage limit. Consider upgrading your plan.', 
      time: '1 hour ago' 
    },
    { 
      id: 3, 
      type: 'message', 
      icon: <MessageCircle className="text-blue-500" />, 
      title: 'New Shared File', 
      message: 'John shared "Project_Presentation.pptx" with you.', 
      time: '3 hours ago' 
    },
    { 
      id: 4, 
      type: 'document', 
      icon: <FileText className="text-purple-500" />, 
      title: 'Document Review', 
      message: 'Your document is ready for final review.', 
      time: 'Yesterday' 
    }
  ]);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3 
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center"
        >
          <Bell className="mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8 text-blue-600" /> 
          Notifications
        </motion.h1>
        <span className="text-sm text-gray-500">
          {notifications.length} unread notifications
        </span>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-4"
      >
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
              <div className="p-2 bg-gray-100 rounded-full flex-shrink-0">
                {notification.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-800 text-sm sm:text-base">{notification.title}</h2>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-1">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
            <div className="flex space-x-2 self-end sm:self-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeNotification(notification.id)}
                className="text-green-500 hover:bg-green-50 p-2 rounded-full"
              >
                <Check className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeNotification(notification.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NotificationsPage;