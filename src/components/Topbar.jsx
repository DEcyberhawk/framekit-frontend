import React, { useState, useEffect } from "react";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Topbar = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };

  const token = localStorage.getItem("token");

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    fetchNotifications();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 shadow-md sticky top-0 z-50">
      {/* Welcome */}
      <h1 className="text-lg font-semibold">Welcome, {user.name}</h1>

      {/* Right-side icons */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <button
          className="relative"
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          <Bell size={22} className="text-gray-600 hover:text-black" />
          {notifications.filter((n) => !n.read).length > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div className="absolute top-10 right-0 bg-white shadow-lg rounded w-64 p-3 border border-gray-200 max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((note) => (
                <div key={note._id} className="p-2 border-b last:border-none">
                  <p className="text-sm text-gray-800">{note.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center">
                No notifications
              </p>
            )}
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
