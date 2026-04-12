import Shell from "@/components/Shell";
import { PARTNERS, FINANCIAL_MONTHLY, FINANCIAL_WEEKLY } from "@/lib/data";

export default function ProfitSharingPage() {
  const monthly = FINANCIAL_MONTHLY[0];
  const weekly = FINANCIAL_WEEKLY[0];

  return (
    <Shell>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Profit Sharing</h1>
        <p style={{ color: "#666", fontSize: 13 }}>Partner ownership percentages · March 2026</p>
      </div>

      {/* Net Profit Summary */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Monthly Net Profit",  value: "$" + monthly.netProfit.toLocaleString(),    sub: "March 2026",          color: "#8B5CF6" },
          { label: "Monthly Income",      value: "$" + monthly.totalIncome.toLocaleString(),   sub: "Total revenue",       color: "#4CAF50" },
          { label: "Monthly Expenses",    value: "$" + monthly.totalExpenses.toLocaleString(), sub: "All costs",           color: "#F44336" },
          { label: "Weekly Net Profit",   value: "$" + weekly.netProfit.toLocaleString(),      sub: "Week of Mar 2–8",     color: "#2196F3" },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: "18px 22px" }}>
            <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 26, fontWeight: "bold" }}>{s.value}</div>
            <div style={{ color: "#555", fontSize: 11, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Partner Cards */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {PARTNERS.map((p, i) => {
          const colors = ["#8B5CF6", "#2196F3", "#4CAF50"];
          const color = colors[i] || "#8B5CF6";
          const weeklyShare = (weekly.netProfit * p.pct);
          return (
            <div key={p.id} style={{ flex: 1, background: "#0D0D22", border: `1px solid ${color}44`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ color, fontSize: 18, fontWeight: "bold" }}>{p.name}</div>
                  <div style={{ color: "#555", fontSize: 12, marginTop: 4 }}>Ownership: {(p.pct * 100).toFixed(0)}%</div>
                </div>
                <div style={{ background: `${color}22`, border: `1px solid ${color}44`, borderRadius: 8, padding: "8px 14px", textAlign: "right" }}>
                  <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase" }}>Share</div>
                  <div style={{ color, fontWeight: "bold", fontSize: 20 }}>{(p.pct * 100).toFixed(0)}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ height: 8, background: "#16163A", borderRadius: 4, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ width: (p.pct * 100) + "%", height: "100%", background: color, borderRadius: 4 }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#090918", borderRadius: 8, padding: 14 }}>
                  <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Monthly Payout</div>
                  <div style={{ color, fontWeight: "bold", fontSize: 22 }}>{"$" + p.netProfitShare.toLocaleString()}</div>
                  <div style={{ color: "#444", fontSize: 10, marginTop: 4 }}>Based on ${monthly.netProfit.toLocaleString()} net</div>
                </div>
                <div style={{ background: "#090918", borderRadius: 8, padding: 14 }}>
                  <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Weekly Est.</div>
                  <div style={{ color: "#888", fontWeight: "bold", fontSize: 22 }}>{"$" + weeklyShare.toFixed(2)}</div>
                  <div style={{ color: "#444", fontSize: 10, marginTop: 4 }}>Based on ${weekly.netProfit.toLocaleString()} net</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Distribution Table */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #2a2a2a" }}>
          <span style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2 }}>
            Partner Distribution Summary — March 2026
          </span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a", background: "#161616" }}>
              {["Partner", "Ownership %", "Monthly Net Profit", "Monthly Share", "Weekly Net Profit", "Weekly Share"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PARTNERS.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #1e1e1e" }}>
                <td style={{ padding: "14px 16px", color: "#fff", fontWeight: "bold", fontSize: 15 }}>{p.name}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: "#8B5CF622", color: "#8B5CF6", padding: "4px 10px", borderRadius: 4, fontWeight: "bold" }}>
                    {(p.pct * 100).toFixed(0)}%
                  </span>
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>{"$" + monthly.netProfit.toLocaleString()}</td>
                <td style={{ padding: "14px 16px", color: "#8B5CF6", fontWeight: "bold", fontSize: 15 }}>{"$" + p.netProfitShare.toLocaleString()}</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>{"$" + weekly.netProfit.toLocaleString()}</td>
                <td style={{ padding: "14px 16px", color: "#4CAF50", fontWeight: "bold" }}>{"$" + (weekly.netProfit * p.pct).toFixed(2)}</td>
              </tr>
            ))}
            <tr style={{ borderTop: "2px solid #2a2a2a", background: "#161616" }}>
              <td style={{ padding: "12px 16px", color: "#888", fontWeight: "bold", textTransform: "uppercase", fontSize: 11 }}>TOTAL</td>
              <td style={{ padding: "12px 16px", color: "#8B5CF6", fontWeight: "bold" }}>100%</td>
              <td style={{ padding: "12px 16px", color: "#888" }}>{"$" + monthly.netProfit.toLocaleString()}</td>
              <td style={{ padding: "12px 16px", color: "#8B5CF6", fontWeight: "bold", fontSize: 15 }}>{"$" + PARTNERS.reduce((s,p) => s+p.netProfitShare, 0).toFixed(2)}</td>
              <td style={{ padding: "12px 16px", color: "#888" }}>{"$" + weekly.netProfit.toLocaleString()}</td>
              <td style={{ padding: "12px 16px", color: "#4CAF50", fontWeight: "bold" }}>{"$" + PARTNERS.reduce((s,p) => s+(weekly.netProfit*p.pct), 0).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
