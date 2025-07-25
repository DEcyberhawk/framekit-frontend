import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const FounderDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/auth/profile")
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Unauthorized:", err.response?.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Founder Dashboard</h1>

      {loading ? (
        <p className="text-indigo-600">Loading profile...</p>
      ) : user ? (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
          <p className="text-lg font-semibold mb-2">Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p className="text-red-500">Unauthorized or failed to fetch user data.</p>
      )}
    </div>
  );
};

export default FounderDashboard;
