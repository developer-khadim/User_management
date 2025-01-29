import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentMonthUsers, setCurrentMonthUsers] = useState(0);
  const [chartData, setChartData] = useState([]);

  // Percentage Monthly users increased
  const currentMonthPercentage = totalUsers ? (currentMonthUsers / totalUsers * 100).toFixed(0) : 0;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/admin/userData`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setTotalUsers(response.data.totalUsers);
      setCurrentMonthUsers(response.data.currentMonthUsers);
      const { monthlyUserStats } = response.data;

      // Map the user Statistics
      const transFormedUsers = monthlyUserStats.map(item => ({
        month: new Date(item.year, item.month - 1).toLocaleString('default', { month: 'short' }),
        users: item.userCount
      }));
      setChartData(transFormedUsers);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  const data = [
    { month: 'Jan', users: 400, tasks: 240, completion: 80 },
    { month: 'Feb', users: 300, tasks: 139, completion: 75 },
    { month: 'Mar', users: 200, tasks: 980, completion: 85 },
    { month: 'Apr', users: 278, tasks: 390, completion: 90 },
    { month: 'May', users: 189, tasks: 480, completion: 82 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
          <p className="text-sm text-gray-500">+{currentMonthPercentage}% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Tasks</h3>
          <p className="text-3xl font-bold text-green-600">567</p>
          <p className="text-sm text-gray-500">+5% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
          <p className="text-3xl font-bold text-purple-600">89%</p>
          <p className="text-sm text-gray-500">+2% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white pt-6 rounded-lg shadow">
          <h3 className="text-lg pl-6 font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white pt-6 rounded-lg shadow">
          <h3 className="text-lg pl-6 font-semibold mb-4">Task Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
