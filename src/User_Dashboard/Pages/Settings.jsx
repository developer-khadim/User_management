import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Bell,
  Shield,
  Palette,
  Moon,
  Sun,
  Check,
  X
} from "lucide-react";
import axios from 'axios'

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [status, setStatus] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });
  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: false,
    dataCollection: true,
  });

  const toggleSwitch = (setting, group, currentValue) => {
    if (group === "notifications") {
      setNotifications((prev) => ({ ...prev, [setting]: !currentValue }));
    } else if (group === "privacy") {
      setPrivacySettings((prev) => ({ ...prev, [setting]: !currentValue }));
    }
  };

  const handleActive = async () => {
    const newStatus = !status; 
    setStatus(newStatus); 

    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/account-status`, 
            { status: newStatus },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Use token for authorization
                }
            });

        console.log("Account status updated:", response.data.status);
    } catch (error) {
        console.error("Error updating account status:", error);
    }
};
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-8">
        <SettingsIcon className="mr-3 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        {/* Notifications */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center mb-4">
            <Bell className="mr-3 text-purple-500" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="capitalize">{key.replace("_", " ")}</span>
                <motion.div
                  onClick={() => toggleSwitch(key, "notifications", value)}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                    value ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    layout
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      value ? "translate-x-6" : ""
                    }`}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center mb-4">
            <Shield className="mr-3 text-red-500" />
            <h2 className="text-xl font-semibold">Privacy</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(privacySettings).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="capitalize">{key.replace("_", " ")}</span>
                <motion.div
                  onClick={() => toggleSwitch(key, "privacy", value)}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                    value ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    layout
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      value ? "translate-x-6" : ""
                    }`}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Appearance & Advanced */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center mb-4">
            <Palette className="mr-3 text-indigo-500" />
            <h2 className="text-xl font-semibold">Appearance & Advanced</h2>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {theme === "light" ? (
                <Sun className="mr-2 text-yellow-500" />
              ) : (
                <Moon className="mr-2 text-gray-700" />
              )}
              <span>Dark Mode</span>
            </div>
            <motion.div
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-300"
              }`}
            >
              <motion.div
                layout
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  theme === "dark" ? "translate-x-6" : ""
                }`}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Active & DeActive */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
          <Shield className="mr-3 " color="green" />
          <h2 className="text-xl font-semibold">Active & Deactive</h2>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
          <span className="flex flex-col items-center " >
  {status ? "Active" : "Deactive"}
  {status ? <Check color="green" size={25} /> : <X color="red" size={25} />}
</span>

          </div>
          <motion.div
            onClick={handleActive} // Call the handleActive function
            className={`w-12 h-6 rounded-full p-1 cursor-pointer ${status ? "bg-green-500" : "bg-gray-300"}`}
          >
            <motion.div
              layout
              className={`w-4 h-4 bg-white rounded-full transition-transform ${status ? "translate-x-6" : "translate-x-0"}`}
            />
          </motion.div>
        </div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
