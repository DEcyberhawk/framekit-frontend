import axiosInstance from "../../utils/axiosInstance";

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    await axiosInstance.post("/auth/register", { name, email, password });
    alert("Registration successful");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  }
};
