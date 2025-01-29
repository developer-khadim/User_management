import React, { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import axios from 'axios'

const UserManagement = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
       axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getAllUsers`, {
           headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
           }
       })
       .then(response => {
           setUsers(response.data.users)
       })
  },[])

  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     role: "Admin",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     role: "User",
  //     status: "Active",
  //   },
  //   {
  //     id: 3,
  //     name: "Bob Johnson",
  //     email: "bob@example.com",
  //     role: "User",
  //     status: "Inactive",
  //   },
  // ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  const handleCreateUser = () => {
    const newUserWithId = { ...newUser, id: users.length + 1 };
    setUsers([...users, newUserWithId]);
    setNewUser({ name: "", email: "", role: "", status: "Active" });
  };

  const handleUpdateUser = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    );
    setUsers(updatedUsers);
  };

  // Delete a user
  const handleDeleteUser = (id) => {

     axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/deleteUser/${id}`, {
           headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
           }
     }).then(response => {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id))
        console.log(response.data.message);
     }).catch(error => {
        console.log('error', error.response?.data?.error || 'Something went wrong');
     })
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          className="flex items-center bg-blue-500 text-white py-3 px-3 rounded-lg gap-2 hover:bg-gray-50 hover:shadow-lg hover:text-black hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={() => handleCreateUser()}
        >
          <PlusCircle size={16} />
          Add User
        </button>
      </div>

      {/* User Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          placeholder="Name"
          className="px-4 py-2 border rounded-lg mb-2 w-full"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 border rounded-lg mb-2 w-full"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          className="px-4 py-2 border rounded-lg mb-2 w-full"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <select
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          className="px-4 py-2 border rounded-lg w-full"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-6 py-4">{user.name.firstName} {user.name.lastName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">User</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleUpdateUser(user._id)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
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

export default UserManagement;
