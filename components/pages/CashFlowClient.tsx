"use client";
import { useState } from "react";
import CashFlowForm from "@/components/forms/CashFlowForm";

export default function CashFlowClient({ entries }: { entries: any[] }) {
  const [open, setOpen] = useState(false);
  const revenue = entries.filter(e => e.Type === "Revenue").reduce((s, e) => s + parseFloat(e.Amount || 0), 0);
  const expenses = entries.filter(e => e.Type === "Expense").reduce((s, e) => s + parseFloat(e.Amount || 0), 0);
  const net = revenue - expenses;

  return (
    <>
      {open && <CashFlowForm onClose={() => setOpen(false)} />}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Cash Flow</h1>
          <p style={{ color: "#666", fontSize: 13 }}>{entries.length} entries</p>
        </div>
        <button onClick={() => setOpen(true)} style={{
          background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6,
          padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer",
        }}>+ Add Entry</button>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Revenue", value: `$${revenue.toLocaleString()}`, color: "#4CAF50" },
          { label: "Total Expenses", value: `$${expenses.toLocaleString()}`, color: "#F44336" },
          { label: "Net", value: `$${net.toLocaleString()}`, color: net >= 0 ? "#8B5CF6" : "#F44336" },
        ].map(c => (
          <div key={c.label} style={{ flex: 1, background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, padding: "20px 24px" }}>
            <div style={{ color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{c.label}</div>
            <div style={{ color: c.color, fontSize: 28, fontWeight: "bold" }}>{c.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
              {["Date","Type","Category","Description","Amount","Method","Notes"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.length === 0
              ? <tr><td colSpan={7} style={{ padding: 32, textAlign: "center", color: "#555" }}>No entries yet — click "Add Entry" to start</td></tr>
              : entries.slice().reverse().map((e: any) => (
                <tr key={e.EntryID} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 13 }}>{e.Date}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: "bold",
                      background: e.Type === "Revenue" ? "#4CAF5022" : "#F4433622",
                      color: e.Type === "Revenue" ? "#4CAF50" : "#F44336" }}>{e.Type}</span>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 13 }}>{e.Category}</td>
                  <td style={{ padding: "12px 16px", color: "#fff" }}>{e.Description}</td>
                  <td style={{ padding: "12px 16px", color: e.Type === "Revenue" ? "#4CAF50" : "#F44336", fontWeight: "bold" }}>
                    {e.Type === "Revenue" ? "+" : "-"}${parseFloat(e.Amount).toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 13 }}>{e.PaymentMethod}</td>
                  <td style={{ padding: "12px 16px", color: "#666", fontSize: 12 }}>{e.Notes}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
