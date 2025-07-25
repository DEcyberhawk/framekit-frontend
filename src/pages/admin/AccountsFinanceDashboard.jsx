import React, { useEffect, useState } from "react";

const AccountsFinanceDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type: "Income", category: "", amount: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);
  }, []);

  const saveTransactions = (updated) => {
    localStorage.setItem("transactions", JSON.stringify(updated));
    setTransactions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount) return;

    const newTransaction = {
      id: Date.now(),
      type: form.type,
      category: form.category.trim(),
      amount: parseFloat(form.amount),
      date: new Date().toISOString(),
    };

    saveTransactions([newTransaction, ...transactions]);
    setForm({ type: "Income", category: "", amount: "" });
  };

  const handleDelete = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    saveTransactions(updated);
  };

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Accounts & Finance</h1>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle("green")}>
          <strong>Total Income</strong>
          <p>GHS {totalIncome.toFixed(2)}</p>
        </div>
        <div style={cardStyle("crimson")}>
          <strong>Total Expense</strong>
          <p>GHS {totalExpense.toFixed(2)}</p>
        </div>
        <div style={cardStyle("#4F46E5")}>
          <strong>Balance</strong>
          <p>GHS {balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Add Transaction Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          style={{ padding: "10px" }}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          style={{ padding: "10px", flex: "1" }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
          style={{ padding: "10px", width: "120px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4F46E5",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      {/* Transaction List */}
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {transactions.map((t) => (
            <li
              key={t.id}
              style={{
                background: "#f9f9f9",
                marginBottom: "10px",
                padding: "12px 16px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{t.category}</strong> – {t.type}
                <br />
                <span style={{ fontSize: "12px", color: "#777" }}>
                  {new Date(t.date).toLocaleString()}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontWeight: "bold", color: t.type === "Income" ? "green" : "crimson" }}>
                  GHS {t.amount.toFixed(2)}
                </span>
                <br />
                <button
                  onClick={() => handleDelete(t.id)}
                  style={{
                    marginTop: "6px",
                    backgroundColor: "#e53e3e",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const cardStyle = (color) => ({
  backgroundColor: color,
  color: "#fff",
  padding: "20px",
  borderRadius: "10px",
  flex: 1,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
});

export default AccountsFinanceDashboard;
