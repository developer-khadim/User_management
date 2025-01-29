// pages/Reports.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { Download, Filter } from 'lucide-react';
import axios from 'axios'

const Reports = () => {
  const [dateRange, setDateRange] = useState('monthly');
  const [pieData, setpieData] = useState([])
  const [activeUsers, setActiveUsers] = useState('')

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/admin/activeUsers`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    })
    .then(response => {
        setActiveUsers(response.data.activeUserCount)
      setpieData([
          { name: 'Active Users', value: response.data.activeUserCount, color: '#8884d8' },
          { name: 'Inactive Users', value: response.data.inactiveUserCount, color: '#82ca9d' },
          { name: 'Suspended', value: 2, color: '#ffc658' }
        ])
    })
 }, [])
  
  const performanceData = [
    { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
    { month: 'Feb', revenue: 3500, expenses: 2000, profit: 1500 },
    { month: 'Mar', revenue: 5000, expenses: 2800, profit: 2200 },
    { month: 'Apr', revenue: 4200, expenses: 2300, profit: 1900 },
  ];

  // const pieData = [
  //   { name: 'Active Users', value: 600, color: '#8884d8' },
  //   { name: 'Inactive Users', value: 300, color: '#82ca9d' },
  //   { name: 'Suspended', value: 100, color: '#ffc658' }
  // ];

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <div className="flex gap-4">
          <select 
            className="border rounded-lg px-4 py-2"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">$16,700</p>
          <p className="text-sm text-gray-500">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">$9,500</p>
          <p className="text-sm text-gray-500">+5% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Net Profit</h3>
          <p className="text-3xl font-bold text-blue-600">$7,200</p>
          <p className="text-sm text-gray-500">+8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-purple-600">{activeUsers}</p>
          <p className="text-sm text-gray-500">+15% from last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue vs Expenses</h3>
          <div className="w-full overflow-x-auto">
            <LineChart width={500} height={300} data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
          <div className="w-full flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;