import React, { useEffect, useState } from "react";

const SettingsDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("settings")) || {};
    if (stored.darkMode !== undefined) setDarkMode(stored.darkMode);
    if (stored.notifications !== undefined) setNotifications(stored.notifications);
    if (stored.language) setLanguage(stored.language);

    document.documentElement.classList.toggle("dark", stored.darkMode || false);
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify({ darkMode, notifications, language }));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode, notifications, language]);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser || !currentUser.password) {
      setFeedback("No user found.");
      return;
    }

    if (currentPassword !== currentUser.password) {
      setFeedback("❌ Current password is incorrect.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setFeedback("❌ New password must be at least 6 characters.");
      return;
    }

    currentUser.password = newPassword;
    localStorage.setItem("user", JSON.stringify(currentUser));
    setFeedback("✅ Password updated successfully.");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleDownloadInvoice = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const name = encodeURIComponent(user.name || "Anonymous User");
    const email = encodeURIComponent(user.email || "anonymous@example.com");
    const plan = "FrameKit Pro";
    const amount = "89.00";

    const url = `https://framekit-backend.onrender.com/api/invoices/generate?name=${name}&email=${email}&plan=${plan}&amount=${amount}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Settings</h1>

      <div style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Dark Mode Toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label htmlFor="darkMode" style={{ fontWeight: "500" }}>Dark Mode</label>
          <input
            id="darkMode"
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        {/* Notifications */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label htmlFor="notifications" style={{ fontWeight: "500" }}>Email Notifications</label>
          <input
            id="notifications"
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        {/* Language Preference */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label htmlFor="language" style={{ fontWeight: "500" }}>Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ padding: "8px", minWidth: "150px" }}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="sw">Swahili</option>
            <option value="tw">Twi</option>
          </select>
        </div>

        {/* 📄 Invoice Export */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontWeight: "500" }}>Export Invoice (PDF)</label>
          <button
            onClick={handleDownloadInvoice}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4F46E5",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            📄 Download
          </button>
        </div>

        <hr style={{ margin: "30px 0", border: "none", borderTop: "1px solid #eee" }} />

        {/* Change Password */}
        <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Change Password</h2>
        <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{ padding: "10px", width: "100%" }}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ padding: "10px", width: "100%" }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4F46E5",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Update Password
          </button>
        </form>
        {feedback && (
          <p style={{ marginTop: "10px", color: feedback.startsWith("✅") ? "green" : "crimson" }}>
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default SettingsDashboard;
