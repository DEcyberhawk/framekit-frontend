import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  ShoppingCart,
  Brush,
} from "lucide-react";
import { getUserRole } from "../utils/auth";
import Topbar from "../components/Topbar";

const MasterLayout = () => {
  const role = getUserRole();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          FrameKit Admin
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {/* Founder Dashboard (Admin Only) */}
            {role === "Admin" && (
              <li>
                <NavLink
                  to="/admin/founder"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <LayoutDashboard size={18} /> Founder Dashboard
                </NavLink>
              </li>
            )}

            {/* User Management (Admin Only) */}
            {role === "Admin" && (
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <Users size={18} /> User Management
                </NavLink>
              </li>
            )}

            {/* Accounts & Finance (Admin/User) */}
            {["Admin", "User"].includes(role) && (
              <li>
                <NavLink
                  to="/admin/accounts"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <ShoppingCart size={18} /> Accounts & Finance
                </NavLink>
              </li>
            )}

            {/* Sales & Marketing (Admin/Sales) */}
            {["Admin", "Sales"].includes(role) && (
              <li>
                <NavLink
                  to="/admin/sales"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <LayoutDashboard size={18} /> Sales & Marketing
                </NavLink>
              </li>
            )}

            {/* Vibe Builder (Admin/Sales) */}
            {["Admin", "Sales"].includes(role) && (
              <li>
                <NavLink
                  to="/admin/vibe-builder"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <Brush size={18} /> Vibe Builder
                </NavLink>
              </li>
            )}

            {/* Settings (All roles) */}
            <li>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <Settings size={18} /> Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content with Topbar */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <Topbar /> {/* Topbar with notifications and logout */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MasterLayout;
