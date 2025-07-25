// src/api/auth.js
import bcrypt from "bcryptjs";

const users = [
  {
    id: 1,
    email: "admin@framekit.app",
    passwordHash: "$2a$10$4nZ1IXMvKd5b6vmY2Z3kheKxQv4gDRZk3AWTxWZmldfM5NzS8MHEK", // 'password123'
    role: "founder",
  },
  {
    id: 2,
    email: "staff@framekit.app",
    passwordHash: "$2a$10$V5zMZn6c6gA9NmWrmROruOHBvIu7X5XcV6C0fDJL7M5fXwG2RbLlu", // 'staffpass'
    role: "users",
  },
];

export const loginUser = async (email, password) => {
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error("Incorrect password");

  return { id: user.id, email: user.email, role: user.role };
};
