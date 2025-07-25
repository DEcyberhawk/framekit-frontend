import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";

const BrandKitGallery = ({ userId }) => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchKits = async () => {
      try {
        const res = await axios.get(`/api/brandkits?userId=${userId}`);
        setKits(res.data);
      } catch (err) {
        setError("Failed to load brand kits");
      } finally {
        setLoading(false);
      }
    };
    fetchKits();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/brandkits/${id}`);
      setKits(kits.filter((kit) => kit._id !== id));
    } catch (err) {
      alert("Error deleting kit");
    }
  };

  if (loading) return <p>Loading kits...</p>;
  if (error) return <p>{error}</p>;
  if (kits.length === 0) return <p>No brand kits saved yet.</p>;

  return (
    <div className="grid gap-4 mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {kits.map((kit) => (
        <div key={kit._id} className="border p-4 rounded-xl shadow bg-white dark:bg-gray-900">
          <h3 className="text-lg font-bold">{kit.brandName}</h3>
          {kit.logo && <img src={kit.logo} alt="Logo" className="h-20 object-contain my-2" />}
          <div className="flex gap-2 my-2">
            {kit.colorPalette.map((color, index) => (
              <div key={index} className="w-6 h-6 rounded-full border" style={{ backgroundColor: color }} />
            ))}
          </div>
          <p className="text-sm text-gray-500">Fonts: {kit.fonts}</p>
          <p className="text-sm mt-2">{kit.bioCaption}</p>
          <button onClick={() => handleDelete(kit._id)} className="mt-3 text-red-500 hover:underline text-sm">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BrandKitGallery;
