import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const VibeBuilder = () => {
  const [form, setForm] = useState({
    userId: "demo-user", // Replace with real user ID later
    brandName: "",
    primaryColor: "",
    secondaryColor: "",
    font: "",
    bioText: "",
  });

  const [savedKits, setSavedKits] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveKit = async () => {
    try {
      const res = await axiosInstance.post("/brandkits", form);
      setSavedKits([...savedKits, res.data]);
      alert("🎉 Brand kit saved!");
    } catch (err) {
      console.error("❌ Save failed:", err);
    }
  };

  const fetchKits = async () => {
    try {
      const res = await axiosInstance.get(`/brandkits/${form.userId}`);
      setSavedKits(res.data);
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchKits();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎨 Vibe Builder</h1>

      <div className="grid gap-4">
        <input
          name="brandName"
          placeholder="Brand Name"
          value={form.brandName}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="primaryColor"
          placeholder="Primary Color (e.g. #FF5733)"
          value={form.primaryColor}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="secondaryColor"
          placeholder="Secondary Color"
          value={form.secondaryColor}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="font"
          placeholder="Font (e.g. Poppins)"
          value={form.font}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <textarea
          name="bioText"
          placeholder="Instagram Bio Example"
          value={form.bioText}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          onClick={saveKit}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Brand Kit
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🗂️ Saved Brand Kits</h2>
        {savedKits.length === 0 ? (
          <p className="text-gray-500">No kits saved yet.</p>
        ) : (
          <ul className="space-y-3">
            {savedKits.map((kit, index) => (
              <li key={index} className="border p-4 rounded shadow-sm">
                <strong>{kit.brandName}</strong>
                <p>
                  🎨 <span style={{ color: kit.primaryColor }}>{kit.primaryColor}</span>{" "}
                  & <span style={{ color: kit.secondaryColor }}>{kit.secondaryColor}</span>
                </p>
                <p>🖋 Font: {kit.font}</p>
                <p>📌 Bio: {kit.bioText}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VibeBuilder;
