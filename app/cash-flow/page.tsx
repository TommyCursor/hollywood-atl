import Shell from "@/components/Shell";
import { FINANCIAL_DAILY, FINANCIAL_WEEKLY, FINANCIAL_MONTHLY, EXPENSES } from "@/lib/data";

export default function CashFlowPage() {
  const weekly = FINANCIAL_WEEKLY[0];
  const monthly = FINANCIAL_MONTHLY[0];

  function Row({ label, value, color, bold }: { label: string; value: number; color?: string; bold?: boolean }) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1e1e1e" }}>
        <span style={{ color: "#aaa", fontSize: 13, fontWeight: bold ? 600 : 400 }}>{label}</span>
        <span style={{ color: color || "#fff", fontWeight: bold ? "bold" : 400, fontSize: bold ? 15 : 13 }}>{"$" + value.toLocaleString()}</span>
      </div>
    );
  }

  return (
    <Shell>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Cash Flow</h1>
        <p style={{ color: "#666", fontSize: 13 }}>March 2026 · Hollywood ATL</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
        {/* Weekly P&L */}
        <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: 20 }}>
          <div style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 16 }}>
            Weekly P&L — Mar 2–8
          </div>
          <Row label="Bar Revenue"    value={weekly.barRevenue}    color="#8B5CF6" />
          <Row label="Food Revenue"   value={weekly.foodRevenue}   color="#4CAF50" />
          <Row label="Door Revenue"   value={weekly.doorRevenue}   color="#2196F3" />
          <Row label="Hookah Revenue" value={weekly.hookahRevenue} color="#9C27B0" />
          <Row label="Cash Revenue"   value={weekly.cashRevenue}   color="#FF9800" />
          <Row label="Total Income"   value={weekly.totalIncome}   color="#fff" bold />
          <div style={{ marginTop: 14 }}>
            <Row label="Labor Cost"     value={weekly.laborCost}     color="#F44336" />
            <Row label="Total Expenses" value={weekly.totalExpenses} color="#F44336" bold />
            <Row label="Net Profit"     value={weekly.netProfit}     color="#4CAF50" bold />
          </div>
        </div>

        {/* Monthly P&L */}
        <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: 20 }}>
          <div style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 16 }}>
            Monthly P&L — March 2026
          </div>
          <Row label="Bar Revenue"    value={monthly.barRevenue}    color="#8B5CF6" />
          <Row label="Food Revenue"   value={monthly.foodRevenue}   color="#4CAF50" />
          <Row label="Door Revenue"   value={monthly.doorRevenue}   color="#2196F3" />
          <Row label="Hookah Revenue" value={monthly.hookahRevenue} color="#9C27B0" />
          <Row label="Cash Revenue"   value={monthly.cashRevenue}   color="#FF9800" />
          <Row label="Total Income"   value={monthly.totalIncome}   color="#fff" bold />
          <div style={{ marginTop: 14 }}>
            <Row label="Total Expenses" value={monthly.totalExpenses} color="#F44336" />
            <Row label="Tax (Georgia)"  value={monthly.totalTax}      color="#FF9800" />
            <Row label="Net Profit"     value={monthly.netProfit}     color="#4CAF50" bold />
          </div>
        </div>

        {/* Daily Snapshot */}
        <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: 20 }}>
          <div style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 16 }}>
            Daily Snapshot
          </div>
          {FINANCIAL_DAILY.map(e => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #1e1e1e" }}>
              <div>
                <div style={{ color: "#ccc", fontSize: 12 }}>{e.date}</div>
                {e.eventName && <div style={{ color: "#8B5CF6", fontSize: 10 }}>{e.eventName}</div>}
              </div>
              <span style={{ color: e.netProfit > 0 ? "#4CAF50" : "#444", fontWeight: "bold", fontSize: 13 }}>
                {"$" + e.netProfit.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Expenses Summary */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: 20 }}>
        <div style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 16 }}>
          Fixed Monthly Expenses — {"$" + EXPENSES.reduce((s,e) => s+e.amount, 0).toLocaleString()} total
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px 20px" }}>
          {EXPENSES.filter(e => e.amount > 0).map(e => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1e1e1e" }}>
              <span style={{ color: "#888", fontSize: 12 }}>{e.vendor}</span>
              <span style={{ color: "#F44336", fontSize: 12, fontWeight: "bold" }}>{"$" + e.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
