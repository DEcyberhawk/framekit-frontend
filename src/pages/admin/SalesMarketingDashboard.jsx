import React, { useState } from "react";

const SalesMarketingDashboard = () => {
  const [activeTab, setActiveTab] = useState("campaigns");

  const renderTab = () => {
    switch (activeTab) {
      case "campaigns":
        return <CampaignManager />;
      case "leads":
        return <LeadsTracker />;
      case "stats":
        return <ConversionStats />;
      case "offers":
        return <PromotionalOffers />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Sales & Marketing Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        {["campaigns", "leads", "stats", "offers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              background: activeTab === tab ? "#222" : "#eee",
              color: activeTab === tab ? "#fff" : "#000",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      {renderTab()}
    </div>
  );
};

// 📌 1. Campaign Manager
const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [title, setTitle] = useState("");

  const addCampaign = () => {
    if (!title) return;
    setCampaigns([{ id: Date.now(), title }, ...campaigns]);
    setTitle("");
  };

  return (
    <div>
      <h3>Create Campaign</h3>
      <input
        type="text"
        placeholder="Campaign Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: "10px", padding: "6px", width: "300px" }}
      />
      <button onClick={addCampaign} style={{ padding: "6px 12px" }}>Add</button>
      <ul style={{ marginTop: "20px" }}>
        {campaigns.map((c) => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  );
};

// 📌 2. Leads Tracker
const LeadsTracker = () => {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("New");

  const addLead = () => {
    if (!name) return;
    setLeads([{ id: Date.now(), name, status }, ...leads]);
    setName("");
    setStatus("New");
  };

  return (
    <div>
      <h3>Leads Tracker</h3>
      <input
        type="text"
        placeholder="Lead Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px", padding: "6px" }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginRight: "10px", padding: "6px" }}
      >
        <option>New</option>
        <option>Contacted</option>
        <option>Converted</option>
        <option>Lost</option>
      </select>
      <button onClick={addLead} style={{ padding: "6px 12px" }}>Add Lead</button>
      <ul style={{ marginTop: "20px" }}>
        {leads.map((l) => (
          <li key={l.id}>
            {l.name} - <strong>{l.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 📌 3. Conversion Stats
const ConversionStats = () => {
  const [converted] = useState(42);
  const [lost] = useState(18);
  const [totalLeads] = useState(100);

  const conversionRate = ((converted / totalLeads) * 100).toFixed(1);

  return (
    <div>
      <h3>Conversion Stats</h3>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <StatCard label="Total Leads" value={totalLeads} />
        <StatCard label="Converted" value={converted} />
        <StatCard label="Lost" value={lost} />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div
    style={{
      padding: "16px",
      borderRadius: "8px",
      background: "#f4f4f4",
      width: "200px",
      boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    }}
  >
    <h4>{label}</h4>
    <p style={{ fontSize: "20px", fontWeight: "bold" }}>{value}</p>
  </div>
);

// 📌 4. Promotional Offers
const PromotionalOffers = () => {
  const [offers, setOffers] = useState([]);
  const [desc, setDesc] = useState("");

  const addOffer = () => {
    if (!desc) return;
    setOffers([{ id: Date.now(), desc }, ...offers]);
    setDesc("");
  };

  return (
    <div>
      <h3>Active Promotions</h3>
      <input
        type="text"
        placeholder="Discount / Promo Text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{ marginRight: "10px", padding: "6px", width: "300px" }}
      />
      <button onClick={addOffer} style={{ padding: "6px 12px" }}>Add Offer</button>
      <ul style={{ marginTop: "20px" }}>
        {offers.map((o) => (
          <li key={o.id}>{o.desc}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalesMarketingDashboard;
