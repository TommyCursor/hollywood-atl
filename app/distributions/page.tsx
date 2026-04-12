import Shell from "@/components/Shell";
import { DISTRIBUTIONS } from "@/lib/data";

export default function DistributionsPage() {
  const outstanding = DISTRIBUTIONS.filter(d => d.status === "Outstanding");
  const settled = DISTRIBUTIONS.filter(d => d.status === "Settled");
  const totalOwed = DISTRIBUTIONS.reduce((s, d) => s + d.totalOwed, 0);
  const totalOutstanding = outstanding.reduce((s, d) => s + d.balance, 0);
  const totalPaid = DISTRIBUTIONS.reduce((s, d) => s + d.totalPaid, 0);

  return (
    <Shell>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Pending Distributions</h1>
          <p style={{ color: "#666", fontSize: 13 }}>{DISTRIBUTIONS.length} records · {outstanding.length} outstanding · {settled.length} settled</p>
        </div>
        <button style={{ background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer" }}>
          + Add Distribution
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total Owed",     value: "$" + totalOwed.toLocaleString(),        color: "#8B5CF6" },
          { label: "Total Paid",     value: "$" + totalPaid.toLocaleString(),         color: "#4CAF50" },
          { label: "Still Owed",     value: "$" + totalOutstanding.toLocaleString(),  color: "#F44336" },
          { label: "Outstanding",    value: outstanding.length + " accounts",         color: "#FF9800" },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 24, fontWeight: "bold" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Outstanding */}
      {outstanding.length > 0 && (
        <div style={{ background: "#0D0D22", border: "1px solid #F4433633", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #2a2a2a", background: "#F4433611" }}>
            <span style={{ color: "#F44336", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2 }}>
              Outstanding — ${totalOutstanding.toLocaleString()} owed
            </span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
                {["Name", "Cashapp", "Date", "Total Owed", "Paid", "Balance", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {outstanding.map(d => (
                <tr key={d.id} style={{ borderBottom: "1px solid #1e1e1e" }}>
                  <td style={{ padding: "11px 14px", color: "#fff", fontWeight: "bold", fontSize: 14 }}>{d.name}</td>
                  <td style={{ padding: "11px 14px", color: "#666", fontSize: 12 }}>{d.cashapp || "—"}</td>
                  <td style={{ padding: "11px 14px", color: "#888", fontSize: 12 }}>{d.date || "—"}</td>
                  <td style={{ padding: "11px 14px", color: "#8B5CF6", fontWeight: "bold" }}>{"$" + d.totalOwed.toLocaleString()}</td>
                  <td style={{ padding: "11px 14px", color: "#4CAF50" }}>{"$" + d.totalPaid.toLocaleString()}</td>
                  <td style={{ padding: "11px 14px", color: "#F44336", fontWeight: "bold", fontSize: 14 }}>{"$" + d.balance.toLocaleString()}</td>
                  <td style={{ padding: "11px 14px" }}>
                    <span style={{ background: "#F4433622", color: "#F44336", padding: "3px 9px", borderRadius: 4, fontSize: 10, fontWeight: "bold" }}>Outstanding</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Settled */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #2a2a2a" }}>
          <span style={{ color: "#4CAF50", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2 }}>
            Settled — {settled.length} accounts cleared
          </span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a", background: "#161616" }}>
              {["Name", "Cashapp", "Date", "Total Owed", "Paid", "Balance", "Status"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {settled.map(d => (
              <tr key={d.id} style={{ borderBottom: "1px solid #1e1e1e" }}>
                <td style={{ padding: "11px 14px", color: "#ccc", fontWeight: "bold" }}>{d.name}</td>
                <td style={{ padding: "11px 14px", color: "#555", fontSize: 12 }}>{d.cashapp || "—"}</td>
                <td style={{ padding: "11px 14px", color: "#555", fontSize: 12 }}>{d.date || "—"}</td>
                <td style={{ padding: "11px 14px", color: "#888" }}>{"$" + d.totalOwed.toLocaleString()}</td>
                <td style={{ padding: "11px 14px", color: "#4CAF50" }}>{"$" + d.totalPaid.toLocaleString()}</td>
                <td style={{ padding: "11px 14px", color: "#4CAF50" }}>✓ $0</td>
                <td style={{ padding: "11px 14px" }}>
                  <span style={{ background: "#4CAF5022", color: "#4CAF50", padding: "3px 9px", borderRadius: 4, fontSize: 10, fontWeight: "bold" }}>Settled</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
