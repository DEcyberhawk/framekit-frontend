import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://framekit-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;