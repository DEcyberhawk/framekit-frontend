import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 ${
      isActive ? "text-indigo-600 font-semibold" : "text-gray-800 dark:text-gray-200"
    }`;

  return (
    <>
      <button
        className="md:hidden p-3 m-2 bg-indigo-600 text-white rounded"
        onClick={() => setOpen(!open)}
      >
        ☰ Menu
      </button>

      {open && (
        <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-md p-5 hidden md:block md:relative absolute z-50">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">FrameKit</h2>
          <nav className="space-y-2">
            <NavLink to="/admin/founder" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/admin/accounts" className={linkClass}>Accounts</NavLink>
            <NavLink to="/admin/sales" className={linkClass}>Sales & Marketing</NavLink>
            <NavLink to="/admin/notifications" className={linkClass}>Notifications</NavLink>
            <NavLink to="/admin/settings" className={linkClass}>Settings</NavLink>
            <NavLink to="/admin/brand-style" className={linkClass}>Vibe Builder</NavLink>
            <NavLink to="/admin/brand-gallery" className={linkClass}>BrandKit Gallery</NavLink>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
