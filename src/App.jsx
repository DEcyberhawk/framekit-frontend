import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import BrandKitGallery from "./pages/admin/BrandKitGallery";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/admin/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Unauthorized from "./pages/Unauthorized";

// Admin Dashboards
import FounderDashboard from "./pages/admin/FounderDashboard";
import AccountsFinanceDashboard from "./pages/admin/AccountsFinanceDashboard";
import SalesMarketingDashboard from "./pages/admin/SalesMarketingDashboard";
import NotificationsDashboard from "./pages/admin/NotificationsDashboard";
import SettingsDashboard from "./pages/admin/SettingsDashboard";
import VibeBuilder from "./pages/admin/VibeBuilder"; 
import UserManagementDashboard from "./pages/admin/UserManagementDashboard"; // ✅ Corrected import

// Layout and Auth
import MasterLayout from "./layouts/MasterLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin", "HR", "Sales", "User"]}>
              <MasterLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="founder"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <FounderDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="accounts"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <AccountsFinanceDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="sales"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Sales"]}>
                <SalesMarketingDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute allowedRoles={["Admin", "HR", "Sales", "User"]}>
                <NotificationsDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={["Admin", "HR", "Sales", "User"]}>
                <SettingsDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="vibe-builder"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Sales"]}>
                <VibeBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="brand-gallery"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Sales", "User"]}>
                <BrandKitGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <UserManagementDashboard /> {/* ✅ Corrected usage */}
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
