import React, { useState, useEffect } from "react";
import { User, Lock, Upload } from "lucide-react";
import { updateUserData } from '../../store/userSlice'
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'

const Profile = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ success: null, error: null });
  const [securityMessage, setSecurityMessage] = useState({ success: null, error: null });
  const [profileData, setProfileData] = useState({
    firstName: userData?.name.firstName,
    lastName: userData?.name.lastName,
    username: userData?.username,
    email: userData?.email,
    bio: userData?.bio,
    profilePicture: null,
    picturePreview: null,
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
  ];

  const handleProfileSave = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", profileData.firstName);
    formData.append("lastName", profileData.lastName);
    formData.append("username", profileData.username);
    formData.append("email", profileData.email);
    formData.append("bio", profileData.bio);
    if (profileData.profilePicture) {
      formData.append("profilePicture", profileData.profilePicture);
    }
    axios.patch(`${import.meta.env.VITE_BASE_URL}/user/updateProfile`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data",
      }
    }).then((response) => {
      dispatch(updateUserData({ userData: response.data.user }));
      setMessage({ success: response.data.message, error: null });
    }).catch(error => {
      setMessage({ success: null, error: error.message || "Something went wrong!" });
    }).finally(() => {
      setLoading(false);
      setIsEditing(false);
    });
  };

  const handleSecuritySave = () => {
    if (password.newPassword === password.confirmPassword) {
      setLoading(true);
      axios.post(`${import.meta.env.VITE_BASE_URL}/user/changePassword`,
        { currentPassword: password.currentPassword, newPassword: password.confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        },
      ).then((response) => {
        setSecurityMessage({ success: response.data.message, error: null });
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          setSecurityMessage({ success: null, error: error.response.data.error });
        } else {
          setSecurityMessage({ success: null, error: error.message || "Something went wrong!" });
        }
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setSecurityMessage({ success: null, error: "Passwords do not match" });
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profilePicture: file,
          picturePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Message Timer
  useEffect(() => {
    if (message.success || message.error) {
      const timer = setTimeout(() => {
        setMessage({ success: null, error: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (securityMessage.success || securityMessage.error) {
      const timer = setTimeout(() => {
        setSecurityMessage({ success: null, error: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [securityMessage]);

  return (
    <div className="bg-white rounded-lg shadow max-w-xl mx-auto">
      <div className="border-b">
        <div className="flex justify-center overflow-x-auto">
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

      <div className="p-6">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Profile Settings</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative group">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {profileData.picturePreview ? (
                        <img
                          src={profileData.picturePreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                      )}
                    </div>
                    {isEditing && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div
                      onClick={() => document.getElementById("profilePictureInput").click()}
                      className={`
                        w-full sm:w-48 h-28
                        flex flex-col items-center justify-center
                        border-2 border-dashed rounded-lg
                        cursor-pointer transition-all
                        border-gray-300 hover:border-indigo-500
                      `}
                    >
                      <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                      <span className="mt-2 text-sm text-gray-500 text-center px-2">
                        Click or drag image here
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        Max size: 5MB
                      </span>
                      <input
                        type="file"
                        id="profilePictureInput"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                    {profileData.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                    {profileData.lastName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={profileData.username}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        username: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                    {profileData.username}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                  {profileData.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                    {profileData.bio || "No bio provided."}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() =>
                isEditing ? handleProfileSave() : setIsEditing(true)
              }
              className={`px-4 py-2 rounded-lg ${
                isEditing
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {loading ? (
                <ClipLoader color={"#FFFFFF"} loading={loading} size={20} />
              ) : (
                isEditing ? "Save Changes" : "Edit Profile"
              )}
            </button>
            {message.success || message.error ? (
              <div>
                {message.success ? (
                  <p className="text-green-500">{message.success}</p>
                ) : (
                  <p className="text-red-500">{message.error}</p>
                )}
              </div>
            ) : null}
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Security Settings</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                {isEditing ? (
                  <input
                    type="password"
                    value={password.currentPassword}
                    onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                ) : (
                  <p className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                    ********
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                {isEditing && (
                  <input
                    type="password"
                    value={password.newPassword}
                    onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                {isEditing && (
                  <input
                    type="password"
                    value={password.confirmPassword}
                    onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                )}
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
              onClick={() =>
                isEditing ? handleSecuritySave() : setIsEditing(true)
              }
              className={`px-4 py-2 rounded-lg ${
                isEditing
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {loading ? (
                <ClipLoader color={"#FFFFFF"} loading={loading} size={20} />
              ) : (
                isEditing ? "Save Changes" : "Change Password"
              )}
            </button>
            {securityMessage.success || securityMessage.error ? (
              <div>
                {securityMessage.success ? (
                  <p className="text-green-500">{securityMessage.success}</p>
                ) : (
                  <p className="text-red-500">{securityMessage.error}</p>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
