import Shell from "@/components/Shell";
import { EXPENSES } from "@/lib/data";

export default function ExpensesPage() {
  const total = EXPENSES.reduce((s, e) => s + e.amount, 0);
  const outstanding = EXPENSES.filter(e => e.status === "Outstanding" && e.balance > 0);
  const totalOutstanding = outstanding.reduce((s, e) => s + e.balance, 0);

  return (
    <Shell>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Monthly Expenses</h1>
          <p style={{ color: "#666", fontSize: 13 }}>{EXPENSES.length} vendors · {"$" + total.toLocaleString()} total monthly obligations</p>
        </div>
        <button style={{ background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer" }}>
          + Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total Monthly Obligations", value: "$" + total.toLocaleString(),            color: "#F44336" },
          { label: "Balance Outstanding",        value: "$" + totalOutstanding.toLocaleString(), color: "#FF9800" },
          { label: "Vendors",                    value: String(EXPENSES.length),                 color: "#8B5CF6" },
          { label: "Recurring This Month",       value: String(EXPENSES.filter(e => e.amount > 0).length), color: "#2196F3" },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 24, fontWeight: "bold" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Expenses Table */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a", background: "#161616" }}>
              {["Vendor / Service", "Notes", "Due Date", "Amount", "Paid", "Balance", "Account #", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EXPENSES.sort((a, b) => b.amount - a.amount).map(e => (
              <tr key={e.id} style={{ borderBottom: "1px solid #1e1e1e" }}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>{e.vendor}</div>
                  {e.website && (
                    <a href={e.website} target="_blank" rel="noreferrer" style={{ color: "#555", fontSize: 10, textDecoration: "none" }}>
                      ↗ Website
                    </a>
                  )}
                </td>
                <td style={{ padding: "12px 14px", color: "#666", fontSize: 12, maxWidth: 160 }}>{e.notes || "—"}</td>
                <td style={{ padding: "12px 14px", color: "#888", fontSize: 12, whiteSpace: "nowrap" }}>{e.dueDesc || "—"}</td>
                <td style={{ padding: "12px 14px", color: e.amount > 0 ? "#F44336" : "#444", fontWeight: "bold", fontSize: 13 }}>
                  {e.amount > 0 ? "$" + e.amount.toLocaleString() : "—"}
                </td>
                <td style={{ padding: "12px 14px", color: e.paid > 0 ? "#4CAF50" : "#444", fontSize: 13 }}>
                  {e.paid > 0 ? "$" + e.paid.toLocaleString() : "—"}
                </td>
                <td style={{ padding: "12px 14px", color: e.balance > 0 ? "#FF9800" : "#4CAF50", fontWeight: "bold", fontSize: 13 }}>
                  {e.balance > 0 ? "$" + e.balance.toLocaleString() : "✓ Paid"}
                </td>
                <td style={{ padding: "12px 14px", color: "#555", fontSize: 11 }}>{e.accountNo || "—"}</td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ padding: "3px 9px", borderRadius: 4, fontSize: 10, fontWeight: "bold",
                    background: e.balance > 0 ? "#FF980022" : "#4CAF5022",
                    color: e.balance > 0 ? "#FF9800" : "#4CAF50" }}>
                    {e.balance > 0 ? "Outstanding" : "Settled"}
                  </span>
                </td>
              </tr>
            ))}
            <tr style={{ borderTop: "2px solid #2a2a2a", background: "#161616" }}>
              <td colSpan={3} style={{ padding: "12px 14px", color: "#888", fontSize: 11, fontWeight: "bold", textTransform: "uppercase" }}>TOTALS</td>
              <td style={{ padding: "12px 14px", color: "#F44336", fontWeight: "bold", fontSize: 14 }}>{"$" + total.toLocaleString()}</td>
              <td style={{ padding: "12px 14px", color: "#4CAF50", fontWeight: "bold" }}>{"$" + EXPENSES.reduce((s,e) => s+e.paid,0).toLocaleString()}</td>
              <td style={{ padding: "12px 14px", color: "#FF9800", fontWeight: "bold", fontSize: 14 }}>{"$" + totalOutstanding.toLocaleString()}</td>
              <td colSpan={2} />
            </tr>
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
