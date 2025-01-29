import React, { useState, useEffect } from 'react';
import { Shield, Users, Key, Database, Server, Plus, Pencil, Trash2, X } from 'lucide-react';
import { Switch } from '../Components/Switch';

const Administration = () => {
  // State management
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    permissions: [],
    status: true
  });

  // Admin cards data
  const adminCards = [
    { title: 'Role Management', icon: <Shield size={24} />, count: `${roles.length} Roles`, color: 'blue' },
    { title: 'System Access', icon: <Key size={24} />, count: '125 Users', color: 'green' },
    { title: 'Database Backups', icon: <Database size={24} />, count: '15 Backups', color: 'purple' },
    { title: 'Server Status', icon: <Server size={24} />, count: '5 Servers', color: 'orange' }
  ];

  // Available permissions
  const availablePermissions = [
    'User Management',
    'Content Management',
    'System Settings',
    'Reports Access',
    'API Access'
  ];

  // Load roles from localStorage on component mount
  useEffect(() => {
    const storedRoles = localStorage.getItem('adminRoles');
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    } else {
      // Set default roles if none exist
      const defaultRoles = [
        {
          id: 1,
          name: 'Administrator',
          users: 5,
          permissions: ['User Management', 'Content Management', 'System Settings'],
          status: true
        },
        {
          id: 2,
          name: 'Editor',
          users: 12,
          permissions: ['Content Management'],
          status: true
        }
      ];
      setRoles(defaultRoles);
      localStorage.setItem('adminRoles', JSON.stringify(defaultRoles));
    }
  }, []);

  // Save roles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('adminRoles', JSON.stringify(roles));
  }, [roles]);

  // Recent activities state
  const [activities, setActivities] = useState([
    { id: 1, action: 'Role updated', user: 'Admin', timestamp: '2 hours ago', details: 'Modified user permissions' },
    { id: 2, action: 'New role created', user: 'System', timestamp: '5 hours ago', details: 'Created Editor role' },
    { id: 3, action: 'Backup completed', user: 'System', timestamp: '1 day ago', details: 'Weekly backup' }
  ]);

  // CRUD Functions
  const addActivity = (action, details) => {
    const newActivity = {
      id: activities.length + 1,
      action,
      user: 'Admin',
      timestamp: 'Just now',
      details
    };
    setActivities([newActivity, ...activities.slice(0, 4)]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRole) {
      // Update existing role
      const updatedRoles = roles.map(role =>
        role.id === editingRole.id
          ? { ...role, ...formData }
          : role
      );
      setRoles(updatedRoles);
      addActivity('Role updated', `Modified ${formData.name} role`);
    } else {
      // Add new role
      const newRole = {
        id: roles.length + 1,
        ...formData,
        users: 0
      };
      setRoles([...roles, newRole]);
      addActivity('Role created', `Created ${formData.name} role`);
    }
    handleCloseModal();
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      permissions: role.permissions,
      status: role.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (roleId) => {
    const roleToDelete = roles.find(role => role.id === roleId);
    setRoles(roles.filter(role => role.id !== roleId));
    addActivity('Role deleted', `Deleted ${roleToDelete.name} role`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRole(null);
    setFormData({
      name: '',
      permissions: [],
      status: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Admin Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded-lg bg-${card.color}-100`}>
                {card.icon}
              </div>
              <span className="text-sm font-medium text-gray-500">{card.count}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
          </div>
        ))}
      </div>

      {/* Role Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Role Management</h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Role
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Role Name</th>
                    <th className="px-4 py-2 text-left">Users</th>
                    <th className="px-4 py-2 text-left">Permissions</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role.id} className="border-b">
                      <td className="px-4 py-3 font-medium">{role.name}</td>
                      <td className="px-4 py-3">{role.users}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((perm, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {perm}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 ${role.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-full text-xs`}>
                          {role.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(role)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Pencil size={16} className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(role.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">by {activity.user}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingRole ? 'Edit Role' : 'Add New Role'}
              </h3>
              <button onClick={handleCloseModal} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permissions
                </label>
                <div className="space-y-2">
                  {availablePermissions.map((permission) => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={(e) => {
                          const updatedPermissions = e.target.checked
                            ? [...formData.permissions, permission]
                            : formData.permissions.filter(p => p !== permission);
                          setFormData({ ...formData, permissions: updatedPermissions });
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.status}
                    onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                  />
                  <span className="text-sm">{formData.status ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingRole ? 'Update' : 'Create'} Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Administration;