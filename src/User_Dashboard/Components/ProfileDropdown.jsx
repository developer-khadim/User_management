import React, { useEffect, useRef } from "react";
import { UserCircle, ChevronDown, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const ProfileDropdown = ({ isOpen, toggleDropdown }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminData } = useSelector((state) => state.admin);
  const { userData } = useSelector((state) => state.user);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    const logoutRoute =  adminData ? '/admin/logout' : '/user/logout';
    axios.get(`${import.meta.env.VITE_BASE_URL}${logoutRoute}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
         }
    }).then(response => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/"); 
   }) .catch(error => {
     console.log(error);
   })
  };

  const name = adminData ? adminData.name.firstName : userData ? userData.username : "Guest";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => toggleDropdown(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
         { userData.picture ?  (<img src={userData.picture} alt="Profile Picture" className="w-8 h-8 rounded-full"/>): <UserCircle className="text-gray-500" /> }
        </div>
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="py-1">
            <button
              className="w-[120px] flex items-center justify-evenly font-medium text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
