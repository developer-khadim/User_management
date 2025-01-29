import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateAdminData } from '../../store/adminSlice'
import {
  User,
  Lock,
  Bell,
  Monitor,
  Globe,
  Upload,
  Moon,
  Sun,
} from "lucide-react";
import { Switch } from "../Components/Switch";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'

const Settings = () => {

  const { adminData } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const { _id ,name, username, email, bio } = adminData;

  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState({ error: null, success: null })
  const [securityMessage, setSecurityMessage] = useState({ error: null, success: null })
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("english");
  const [profileData, setProfileData] = useState({
    adminId: _id ? _id : undefined,
    name: name.firstName ? name.firstName : undefined,
    username: username ? username : undefined,
    email: email ? email : undefined,
    bio: bio ? bio : undefined,
    profilePicture: null,
    picturePreview: null,
  });
  const [password, setPassword] = useState({
      currentPassword : '',
      newPassword: '',
      confirmPassword: ''
  })

  const handleProfileSave = (e) => {
       e.preventDefault();
       setLoading(true);
      //  Form Data
       const formData = new FormData();
       formData.append("adminId", profileData.adminId);
       formData.append("name", profileData.name);
       formData.append("username", profileData.username);
       formData.append("email", profileData.email);
       formData.append("bio", profileData.bio);
       if (profileData.profilePicture) {
         formData.append("profilePicture", profileData.profilePicture); 
       }
           
     axios.patch(`${import.meta.env.VITE_BASE_URL}/admin/updateProfile`, formData,
      {  
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data", 
         }
      },
    ).then((response) => {
         dispatch(updateAdminData({adminData:response.data.admin}))
         setMessage((prevMessage) => ({ ...prevMessage, success: response.data.message }))
      }).catch(error => {
         setMessage((prevMessage) => ({ ...prevMessage, error: error.message || "Something went wrong!"}))
      }).finally(() => {
         setLoading(false)
      })
  };


  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Monitor size={18} /> },
  ];

  const notificationSettings = [
    {
      id: "email",
      label: "Email Notifications",
      description: "Receive email notifications for important updates",
    },
    {
      id: "push",
      label: "Push Notifications",
      description: "Receive push notifications on your desktop",
    },
    {
      id: "marketing",
      label: "Marketing Emails",
      description: "Receive emails about new features and updates",
    },
    {
      id: "security",
      label: "Security Alerts",
      description: "Get notified about important security updates",
    },
  ];

  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
  ];


  
  const handleSecuritySave = (e) => {
    e.preventDefault();
    if(password.newPassword === password.confirmPassword){
      setLoading(true);
      axios.post(`${import.meta.env.VITE_BASE_URL}/admin/changePassword`, 
        { currentPassword: password.currentPassword, newPassword:password.confirmPassword},
        {  
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
           }
        },
      ).then((response) => {
        setSecurityMessage((prevMessage) => ({ ...prevMessage, success: response.data.message }))
        
        }).catch(error => {
          if (error.response && error.response.status === 400) {
            setSecurityMessage((prevMessage) => ({...prevMessage, error: error.response.data.error }));
        } else {
            setSecurityMessage((prevMessage) => ({...prevMessage, error: error.message || "Something went wrong!"}));
        }
        }).finally(() => {
            setLoading(false);
        })
      } else {
        setSecurityMessage((prevMessage) => ({ ...prevMessage, error: "Passwords are not matched" }))
      }
    } 

  const handleNotificationsSave = () => {
    console.log("Notification settings saved");
  };

  // Message Timer
  useEffect(() => {
    if (message.success || message.error) {
      const timer = setTimeout(() => {
        setMessage({ error: null, success: null });
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [message]);

  useEffect(() => {
    if (securityMessage.success || securityMessage.error) {
      const timer = setTimeout(() => {
        setSecurityMessage({ error: null, success: null });
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [securityMessage]);


  // Profile Picture Change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          picturePreview: reader.result,
          profilePicture: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Settings Navigation */}
      <div className="border-b">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="p-6">
        {activeTab === "profile" && (
          
          <div className="space-y-6">
            <form
            onSubmit={handleProfileSave}>
            <h3 className="text-lg font-medium">Profile Settings</h3>
            <div className="grid grid-cols-1 gap-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    {profileData.picturePreview ? (
                      <img
                        src={profileData.picturePreview}
                        alt="Profile"
                        className="w-24 h-24  rounded-full"
                      />
                    ) : (
                      <User size={32} className="text-gray-500" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      document.getElementById("profilePictureInput").click()
                    }
                    className="w-80 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                  >
                    <Upload size={24} className="text-gray-500" />
                    <span className="mt-2 text-sm text-gray-500">
                      Click to upload
                    </span>
                    <input
                      type="file"
                      id="profilePictureInput"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
            <button
            type="submit"
              className="bg-blue-500 py-3 px-4 font-medium rounded-xl text-white hover:text-black hover:bg-transparent hover:border hover:border-gray-100 duration-300 hover:shadow-md"
            >
              { loading ? (<ClipLoader color={"#FFFFFF"} loading={loading} size={20} />) : "Save Changes"}
            </button>
            </form>
            { message ? <div>
              {message.success ? <p className="text-green-500 text-xl">{message.success}</p> : 
              <p className="text-red-500">{message.error}</p>} </div> 
              : null
            }
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
          <form onSubmit={handleSecuritySave}>
            <h3 className="text-lg font-medium">Security Settings</h3>
            
            <div className="grid grid-cols-1 gap-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  value={password.currentPassword}
                  onChange={(e) => setPassword({ ...password, currentPassword: e.target.value }) }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={password.newPassword}
                  onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={password.confirmPassword}
                  onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Two-Factor Authentication
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Enable two-factor authentication
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 py-3 px-4 font-medium rounded-xl text-white hover:text-black hover:bg-transparent hover:border hover:border-gray-100 duration-300 hover:shadow-md"
            >
              { loading ? (<ClipLoader color={"#FFFFFF"} loading={loading} size={20} />) : "Save Changes"}
            </button>
            </form>
            { securityMessage ? <div>
              {securityMessage.success ? <p className="text-green-500 text-xl">{securityMessage.success}</p> : 
              <p className="text-red-500">{securityMessage.error}</p>} </div> 
              : null
            }
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <div className="grid grid-cols-1 gap-6 max-w-2xl">
              {notificationSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {setting.label}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {setting.description}
                    </p>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 py-3 px-4 font-medium rounded-xl text-white hover:text-black hover:bg-transparent hover:border hover:border-gray-100 duration-300 hover:shadow-md"
              onClick={handleNotificationsSave}
            >
              Save Changes
            </button>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Appearance Settings</h3>
            <div className="grid grid-cols-1 gap-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Theme
                </label>
                <div className="mt-2 flex items-center space-x-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={`p-3 rounded-md flex items-center ${
                      theme === "light"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    <Sun size={18} />
                    <span className="ml-2">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`p-3 rounded-md flex items-center ${
                      theme === "dark"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    <Moon size={18} />
                    <span className="ml-2">Dark</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
