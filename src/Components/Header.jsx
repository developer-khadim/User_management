import React, { useState } from "react";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ isSidebarCollapsed }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Import the useNavigate hook
  const { adminData } = useSelector((state) => state.admin);
  const { userData } = useSelector((state) => state.user);


  if (!adminData && !userData) {
    return <div>Loading user data...</div>;
  }

  const name = adminData
    ? adminData.name.firstName
    : userData
    ? userData.username
    : "Guest";

  return (
    <header
      className={`fixed top-0 right-0 transition-all duration-300 ${
        isSidebarCollapsed ? "left-[80px]" : "left-[240px]"
      } h-16 bg-black border-b border-zinc-800 px-4 flex items-center justify-between`}
    >
      <h1 className="text-lg font-medium text-white">Administration</h1>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white">
          <Bell size={18} />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
            {
            (userData?.picture || adminData?.picture) ? (
            <img
              src={userData?.picture || adminData?.picture}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            ) : (
              <User size={18} />
            ) 
            }

            </div>
            <span className="text-sm font-medium text-white">{name}</span>
            <ChevronDown
              size={18}
              className={`transform transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute -right-2 mt-2 w-43 bg-zinc-900 rounded-lg shadow-lg py-1 border border-zinc-800">
              <button className="w-full px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white text-left">
                Profile
              </button>
              <button className="w-full px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white text-left">
                Settings
              </button>
            <div className="absolute -right-2 mt-2 w-[140px] bg-zinc-900 rounded-lg shadow-lg py-1 border border-zinc-800">
              <Link to="/profile" className="w-full px-4 py-2 text-sm font-semibold text-zinc-400 hover:bg-zinc-800 hover:rounded-lg hover:text-white text-left">
                Profile
              </Link>
              <div className="border-t border-zinc-800 my-1" />
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-red-500 hover:bg-zinc-800 hover:text-red-400 text-left flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
