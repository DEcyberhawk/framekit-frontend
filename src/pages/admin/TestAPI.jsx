import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";

const TestAPI = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/auth")
      .then((res) => setMessage(res.data))
      .catch((err) => setMessage("❌ API Error"));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Test API Page</h1>
      <p>{typeof message === "string" ? message : JSON.stringify(message)}</p>
    </div>
  );
};

export default TestAPI;
