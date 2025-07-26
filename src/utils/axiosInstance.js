import axios from "axios";

console.log("✅ API BASE:", import.meta.env.VITE_API_URL); // Debug log

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
