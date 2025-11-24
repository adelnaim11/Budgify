import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userId] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState();

  const [filterText, setFilterText] = useState("");
  const [form, setForm] = useState({
    date: "",
    desc: "",
    amount: "",
    category: "",
  });

  function currency(n) {
    const sign = n < 0 ? "-" : "";
    return `${sign}$${Math.abs(n).toFixed(2)}`;
  }

  const totals = useMemo(() => {
    let spent = 0;
    let income = 0;

    for (const t of transactions) {
      if (t.amount > 0) spent += t.amount;
      else income += -t.amount;
    }

    return { spent, income };
  }, [transactions]);

  const categoryBreakdown = useMemo(() => {
    const map = {};
    for (const t of transactions) {
      const c = t.category || "Other";
      map[c] = (map[c] || 0) + (t.amount > 0 ? t.amount : 0);
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  function addTransaction(e) {
    e.preventDefault();
    const amt = parseFloat(form.amount);

    if (!form.date || !form.desc || Number.isNaN(amt)) {
      return alert("Please complete all required fields with a valid amount.");
    }

    const newTx = {
      id: Date.now(),
      userId,
      date: form.date,
      description: form.desc,
      amount: amt,
      category: form.category || "Other",
    };

    setTransactions((prev) => [newTx, ...prev]);
    setForm({ date: "", desc: "", amount: "", category: "" });
  }

  function removeTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function updateBudget(newBudget) {
    setBudget(newBudget);
  }

  const filtered = transactions.filter((t) => {
    if (!filterText) return true;
    const q = filterText.toLowerCase();
    return `${t.description} ${t.category} ${t.date}`
      .toLowerCase()
      .includes(q);
  });

  const progress = budget
    ? Math.min(100, Math.round((totals.spent / budget) * 100))
    : 0;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>BudgetTrack</h1>
          <p>Track your spending and control your budget easily.</p>
        </div>

        <div className="budget-box">
          <label>Monthly Budget</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => updateBudget(Number(e.target.value || 0))}
          />
          <div>{budget ? currency(budget) : "$0.00"}</div>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Overview</h3>

          <div className="overview">
            <div>
              <span>Spent</span>
              <strong className="text-red">{currency(totals.spent)}</strong>
            </div>
            <div>
              <span>Income</span>
              <strong className="text-green">{currency(totals.income)}</strong>
            </div>
            <div>
              <span>Remaining</span>
              <strong>
                {budget ? currency(budget - totals.spent) : "$0.00"}
              </strong>
            </div>
          </div>

          <div className="progress-bar">
            <div style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-muted">{progress}% used</p>
        </div>

        <div className="card">
          <h3>Spending by Category</h3>
          <ul className="category-list">
            {categoryBreakdown.length === 0 && (
              <p className="text-muted">No spending yet.</p>
            )}

            {categoryBreakdown.map((c, i) => (
              <li key={i}>
                <span>{c.name}</span>
                <span>{currency(c.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Quick Add</h3>

          <form onSubmit={addTransaction}>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <input
              type="text"
              placeholder="Description"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />

            <input
              type="text"
              placeholder="Amount (positive = expense, negative = income)"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />

            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <div className="form-actions">
              <button className="btn primary">Add</button>
              <button
                type="button"
                className="btn secondary"
                onClick={() =>
                  setForm({ date: "", desc: "", amount: "", category: "" })
                }
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="card">
          <div className="transactions-header">
            <h3>Transactions</h3>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <button onClick={() => setFilterText("")}>✕</button>
            </div>
          </div>

          <table className="transactions">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td>{t.category}</td>
                  <td className={t.amount > 0 ? "text-red" : "text-green"}>
                    {currency(t.amount)}
                  </td>
                  <td>
                    <button
                      className="btn danger small"
                      onClick={() => removeTransaction(t.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-footer">
            <span>Showing {filtered.length} transactions</span>
            <span>
              Total: {currency(filtered.reduce((sum, t) => sum + t.amount, 0))}
            </span>
          </div>
        </div>
      </div>

      <div className="container-dashboard"></div>
    </div>
  );
};

export default Dashboard;
