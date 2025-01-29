  import React, { useState, useEffect } from 'react';
  import { Check, Clock, AlertCircle, Pencil, Trash2, Plus, X } from 'lucide-react';
  const Tasks = () => {
    const loadTasks = () => {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [
        { id: 1, title: 'Review new user signups', priority: 'High', status: 'Pending', dueDate: '2024-01-25' },
        { id: 2, title: 'Update user documentation', priority: 'Medium', status: 'In Progress', dueDate: '2024-01-26' },
        { id: 3, title: 'Fix login issues', priority: 'High', status: 'Completed', dueDate: '2024-01-24' },
      ];
    };

    const [tasks, setTasks] = useState(loadTasks());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
      title: '',
      priority: 'Medium',
      status: 'Pending',
      dueDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const priorities = ['High', 'Medium', 'Low'];
    const statuses = ['Pending', 'In Progress', 'Completed'];

    const getStatusIcon = (status) => {
      switch (status) {
        case 'Completed':
          return <Check className="text-green-500" size={16} />;
        case 'In Progress':
          return <Clock className="text-yellow-500" size={16} />;
        case 'Pending':
          return <AlertCircle className="text-red-500" size={16} />;
        default:
          return null;
      }
    };

    const getPriorityClass = (priority) => {
      switch (priority) {
        case 'High':
          return 'bg-red-100 text-red-800';
        case 'Medium':
          return 'bg-yellow-100 text-yellow-800';
        case 'Low':
          return 'bg-green-100 text-green-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.title.trim()) {
        alert('Please enter a task title');
        return;
      }
      
      if (editingTask) {
        const updatedTasks = tasks.map(task =>
          task.id === editingTask.id ? { ...formData, id: task.id } : task
        );
        setTasks(updatedTasks);
      } else {
        const newTask = { ...formData, id: Date.now() };
        setTasks([...tasks, newTask]);
      }
      handleCloseModal();
    };

    const handleDeleteTask = (id) => {
      if (window.confirm('Are you sure you want to delete this task?')) {
        setTasks(tasks.filter(task => task.id !== id));
      }
    };

    const handleEditTask = (task) => {
      setEditingTask(task);
      setFormData({
        title: task.title,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate
      });
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingTask(null);
      setFormData({
        title: '',
        priority: 'Medium',
        status: 'Pending',
        dueDate: new Date().toISOString().split('T')[0]
      });
    };

    const TaskModal = () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value.trim() })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
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
                  {editingTask ? 'Update' : 'Create'} Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

    return (
      <div className="space-y-6 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            Add New Task
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
            <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'Completed').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {tasks.filter(t => t.status !== 'Completed').length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Priority</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Due Date</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span className="whitespace-nowrap">{task.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{task.dueDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit task"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete task"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && <TaskModal />}
      </div>
    );
  };

  export default Tasks;