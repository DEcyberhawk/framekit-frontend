import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";

const TestAPI = () => {
  const [status, setStatus] = useState("Checking...");

  const testIfServerIsUp = async () => {
    try {
      const response = await axiosInstance.get("/"); // ✅ Calls /api/auth using the baseURL
      setStatus(`✅ ${res.data}`);
    } catch (err) {
      setStatus(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  useEffect(() => {
    testIfServerIsUp();
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🔍 API Test Page</h1>
      <p>{status}</p>
    </div>
  );
};

export default TestAPI;
