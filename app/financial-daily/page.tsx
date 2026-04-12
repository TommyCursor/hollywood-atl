import Shell from "@/components/Shell";
import { FINANCIAL_DAILY, FINANCIAL_WEEKLY, FINANCIAL_MONTHLY } from "@/lib/data";

export default function FinancialDailyPage() {
  const weekly = FINANCIAL_WEEKLY[0];
  const monthly = FINANCIAL_MONTHLY[0];
  const entries = FINANCIAL_DAILY;
  const totalIncome = entries.reduce((s, e) => s + e.totalIncome, 0);
  const totalExpenses = entries.reduce((s, e) => s + e.totalExpenses, 0);
  const totalTax = entries.reduce((s, e) => s + e.expTax, 0);

  const statStyle = { flex: 1, background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: "14px 18px" };
  const labelStyle = { color: "#666", fontSize: 10, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 6 };

  return (
    <Shell>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Financial Daily</h1>
        <p style={{ color: "#666", fontSize: 13 }}>March 2026 · {entries.length} entries · Hollywood ATL</p>
      </div>

      {/* Weekly Summary */}
      <div style={{ background: "#161616", border: "1px solid #8B5CF633", borderRadius: 10, padding: "16px 20px", marginBottom: 18 }}>
        <div style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 }}>
          Weekly Summary — Mar 2–8, 2026
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "Bar Sales",    value: weekly.barRevenue,    color: "#8B5CF6" },
            { label: "Food Sales",   value: weekly.foodRevenue,   color: "#4CAF50" },
            { label: "Door Sales",   value: weekly.doorRevenue,   color: "#2196F3" },
            { label: "Hookah Sales", value: weekly.hookahRevenue, color: "#9C27B0" },
            { label: "Cash Sales",   value: weekly.cashRevenue,   color: "#FF9800" },
            { label: "Total Income",   value: weekly.totalIncome,   color: "#fff"    },
            { label: "Labor Cost",     value: weekly.laborCost,     color: "#F44336" },
            { label: "Total Expenses", value: weekly.totalExpenses, color: "#F44336" },
            { label: "Net Profit",     value: weekly.netProfit,     color: "#4CAF50" },
          ].map(r => (
            <div key={r.label}>
              <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{r.label}</div>
              <div style={{ color: r.color, fontWeight: "bold", fontSize: 15 }}>{"$" + r.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Summary */}
      <div style={{ background: "#161616", border: "1px solid #8B5CF622", borderRadius: 10, padding: "16px 20px", marginBottom: 22 }}>
        <div style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 }}>
          Monthly Summary — March 2026
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "Total Income",   value: monthly.totalIncome,   color: "#4CAF50" },
            { label: "Total Expenses", value: monthly.totalExpenses, color: "#F44336" },
            { label: "Tax",            value: monthly.totalTax,      color: "#FF9800" },
            { label: "Net Profit",     value: monthly.netProfit,     color: "#8B5CF6" },
          ].map(r => (
            <div key={r.label}>
              <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{r.label}</div>
              <div style={{ color: r.color, fontWeight: "bold", fontSize: 17 }}>{"$" + r.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Table — exact Financial_Daily sheet columns */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #2a2a2a" }}>
                <th colSpan={6} style={{ padding: "10px 14px", textAlign: "left", color: "#4CAF50", fontSize: 10, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1, borderRight: "1px solid #2a2a2a" }}>
                  INCOME
                </th>
                <th colSpan={7} style={{ padding: "10px 14px", textAlign: "left", color: "#F44336", fontSize: 10, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1, borderRight: "1px solid #2a2a2a" }}>
                  EXPENSES
                </th>
                <th colSpan={2} style={{ padding: "10px 14px", textAlign: "left", color: "#8B5CF6", fontSize: 10, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                  NET
                </th>
              </tr>
              <tr style={{ borderBottom: "1px solid #2a2a2a", background: "#161616" }}>
                {["Date", "Event", "Promoter", "Door", "Hookah", "Food", "Bar", "Cash", "Total In",
                  "Ads", "Booking", "DJ", "Promo Pay", "Bus Boy", "Tips", "Tax", "Total Exp",
                  "Net Profit", "Profit %"].map((h, i) => (
                  <th key={h} style={{
                    padding: "10px 12px", textAlign: "left", color: "#666", fontSize: 10,
                    textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap",
                    borderRight: (i === 8 || i === 16) ? "1px solid #2a2a2a" : undefined,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} style={{ borderBottom: "1px solid #1e1e1e" }}>
                  <td style={{ padding: "10px 12px", color: "#ccc", fontSize: 12, whiteSpace: "nowrap" }}>{e.date}</td>
                  <td style={{ padding: "10px 12px", color: "#fff", fontSize: 12, whiteSpace: "nowrap" }}>{e.eventName || "—"}</td>
                  <td style={{ padding: "10px 12px", color: "#8B5CF6", fontSize: 12 }}>{e.promoterName || "—"}</td>
                  <td style={{ padding: "10px 12px", color: e.revDoor ? "#4CAF50" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.revDoor.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.revHookah ? "#4CAF50" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.revHookah.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.revFood ? "#4CAF50" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.revFood.toFixed(2)}</td>
                  <td style={{ padding: "10px 12px", color: e.revBar ? "#4CAF50" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.revBar.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.cashOnHand ? "#FF9800" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.cashOnHand.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: "#fff", fontWeight: "bold", fontSize: 12, textAlign: "right", borderRight: "1px solid #2a2a2a" }}>{"$" + e.totalIncome.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.expAds ? "#F44336" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.expAds.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.expBooking ? "#F44336" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.expBooking.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.expDJ ? "#F44336" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.expDJ.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.expPromoterPay ? "#F44336" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.expPromoterPay.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.expBusBoy ? "#F44336" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.expBusBoy.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.expTips ? "#F44336" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.expTips.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.expTax ? "#FF9800" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.expTax.toFixed(2)}</td>
                  <td style={{ padding: "10px 12px", color: "#F44336", fontWeight: "bold", fontSize: 12, textAlign: "right", borderRight: "1px solid #2a2a2a" }}>{"$" + e.totalExpenses.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.netProfit > 0 ? "#4CAF50" : "#F44336", fontWeight: "bold", fontSize: 13, textAlign: "right" }}>{"$" + e.netProfit.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", color: e.profitPct >= 0.8 ? "#4CAF50" : "#FF9800", fontSize: 12, textAlign: "right" }}>{(e.profitPct * 100).toFixed(1)}%</td>
                </tr>
              ))}
              {/* Totals Row */}
              <tr style={{ borderTop: "2px solid #2a2a2a", background: "#161616" }}>
                <td colSpan={3} style={{ padding: "12px", color: "#888", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>TOTALS</td>
                <td style={{ padding: "12px", color: "#4CAF50", fontWeight: "bold", textAlign: "right" }}>{"$" + entries.reduce((s,e) => s+e.revDoor, 0).toLocaleString()}</td>
                <td style={{ padding: "12px", color: "#4CAF50", fontWeight: "bold", textAlign: "right" }}>{"$" + entries.reduce((s,e) => s+e.revHookah, 0).toLocaleString()}</td>
                <td style={{ padding: "12px", color: "#4CAF50", fontWeight: "bold", textAlign: "right" }}>{"$" + entries.reduce((s,e) => s+e.revFood, 0).toFixed(2)}</td>
                <td style={{ padding: "12px", color: "#4CAF50", fontWeight: "bold", textAlign: "right" }}>{"$" + entries.reduce((s,e) => s+e.revBar, 0).toLocaleString()}</td>
                <td style={{ padding: "12px", color: "#FF9800", fontWeight: "bold", textAlign: "right" }}>{"$" + entries.reduce((s,e) => s+e.cashOnHand, 0).toLocaleString()}</td>
                <td style={{ padding: "12px", color: "#fff", fontWeight: "bold", textAlign: "right", borderRight: "1px solid #2a2a2a" }}>{"$" + totalIncome.toLocaleString()}</td>
                <td colSpan={6} />
                <td style={{ padding: "12px", color: "#FF9800", fontWeight: "bold", textAlign: "right" }}>{"$" + totalTax.toFixed(2)}</td>
                <td style={{ padding: "12px", color: "#F44336", fontWeight: "bold", textAlign: "right", borderRight: "1px solid #2a2a2a" }}>{"$" + totalExpenses.toLocaleString()}</td>
                <td style={{ padding: "12px", color: "#4CAF50", fontWeight: "bold", textAlign: "right", fontSize: 14 }}>{"$" + (totalIncome - totalExpenses).toLocaleString()}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
