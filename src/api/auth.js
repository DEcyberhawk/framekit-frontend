import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API}/auth/login`, { email, password });
  return response.data;
};
