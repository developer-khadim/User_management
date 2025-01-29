import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'


const UserData = () => {

    const [last30DaysActive, setlast30DaysActive] = useState(0)
    const [currentMonthUsers, setCurrentMonthUsers] = useState(0)
    const [chartData, setChartData] = useState([])

  // 
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/admin/userData`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    })
    .then(response => {
      setlast30DaysActive(response.data.last30DaysActive)
        setCurrentMonthUsers(response.data.currentMonthUsers)
        const { monthlyUserStats } = response.data;

        console.log(monthlyUserStats)
        const transformedData = monthlyUserStats.map((item) => {
          const paddedMonth = item.month.toString().padStart(2, '0'); 
          const date = `${item.year}-${paddedMonth}`; 
          return {
            date: date,
            activeUsers: 3, 
            newUsers: item.userCount,
            churn: 1, 
          }
        })
        setChartData(transformedData)        
    })
 }, [])
 
  return (
    <div className="space-y-6">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-blue-600">{last30DaysActive}</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">New Users</h3>
          <p className="text-3xl font-bold text-green-600">{currentMonthUsers}</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Churn Rate</h3>
          <p className="text-3xl font-bold text-red-600">1.4%</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">User Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="activeUsers" stroke="#8884d8" fill="#8884d8" name="Active Users" />
            <Area type="monotone" dataKey="newUsers" stroke="#82ca9d" fill="#82ca9d" name="New Users" />
            <Area type="monotone" dataKey="churn" stroke="#ffc658" fill="#ffc658" name="Churn Rate" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserData;
