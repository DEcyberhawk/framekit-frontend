import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const TestAPI = () => {
  const [status, setStatus] = useState("Testing...");

  useEffect(() => {
    axiosInstance
      .get("/auth")
      .then((res) => {
        setStatus(`✅ Success: ${res.data}`);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          setStatus(`❌ ${err.response.status} - ${err.response.statusText}`);
        } else {
          setStatus(`❌ Network Error: ${err.message}`);
        }
      });
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>API Diagnostic</h1>
      <p>Base URL: {axiosInstance.defaults.baseURL}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default TestAPI;
