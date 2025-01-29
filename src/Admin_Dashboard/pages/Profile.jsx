import React, { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe",
    profilePic: "https://via.placeholder.com/150",
    password: "",
  });

  const [newPassword, setNewPassword] = useState("");

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (newPassword) {
      setProfile({ ...profile, password: newPassword });
      setNewPassword("");
      alert("Password updated successfully!");
    } else {
      alert("Please enter a new password.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      
      {/* Profile Picture */}
      <div className="flex items-center gap-4">
        <img
          src={profile.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border shadow"
        />
        <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
          Change Picture
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </label>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          value={profile.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handlePasswordChange}
          className="mt-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Update Password
        </button>
      </div>

      {/* Save Changes Button */}
      <button
        onClick={() => alert("Profile updated successfully!")}
        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
