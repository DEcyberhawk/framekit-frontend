import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState("");

  // Get token from local storage
  const token = localStorage.getItem("token");

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        // Update user
        await axios.put(`http://localhost:5000/api/users/${editingUserId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("User updated successfully");
      } else {
        // Add new user
        await axios.post("http://localhost:5000/api/users", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("User added successfully");
      }
      setForm({ name: "", email: "", password: "", role: "" });
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Operation failed");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, password: "", role: user.role });
    setEditingUserId(user._id);
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("User deleted");
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {message && <p className="text-sm text-green-600 mb-4">{message}</p>}

      {/* User Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder={editingUserId ? "Leave blank to keep password" : "Password"}
          value={form.password}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required={!editingUserId}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editingUserId ? "Update User" : "Add User"}
        </button>
      </form>

      {/* Users Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2">Name</th>
            <th className="border border-gray-300 px-3 py-2">Email</th>
            <th className="border border-gray-300 px-3 py-2">Role</th>
            <th className="border border-gray-300 px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-3 py-2">{user.name}</td>
              <td className="border border-gray-300 px-3 py-2">{user.email}</td>
              <td className="border border-gray-300 px-3 py-2">{user.role}</td>
              <td className="border border-gray-300 px-3 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
