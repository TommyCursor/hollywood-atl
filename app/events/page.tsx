import Shell from "@/components/Shell";
import { EVENTS } from "@/lib/data";

const statusColor: Record<string, string> = {
  Active: "#4CAF50", Upcoming: "#2196F3", Completed: "#888", Cancelled: "#F44336",
};

export default function EventsPage() {
  const completed = EVENTS.filter(e => e.status === "Completed" || e.status === "Active");
  const upcoming = EVENTS.filter(e => e.status === "Upcoming");
  const totalRevenue = EVENTS.reduce((s, e) => s + e.revenue.total, 0);

  return (
    <Shell>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Events</h1>
          <p style={{ color: "#666", fontSize: 13 }}>{EVENTS.length} events · March 2026 · {"$" + totalRevenue.toLocaleString()} total revenue</p>
        </div>
        <button style={{ background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer" }}>
          + Create Event
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total Events",    value: EVENTS.length,        color: "#8B5CF6" },
          { label: "Total Revenue",   value: "$" + totalRevenue.toLocaleString(), color: "#4CAF50", isStr: true },
          { label: "Upcoming",        value: upcoming.length,      color: "#2196F3" },
          { label: "With Promoter",   value: EVENTS.filter(e => e.promoterName).length, color: "#9C27B0" },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 24, fontWeight: "bold" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Events Table */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a", background: "#161616" }}>
              {["Date", "Day", "Event / Theme", "Time", "Promoter", "Deal Structure", "Door", "Hookah", "Food", "Bar", "Total Revenue", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EVENTS.map(e => (
              <tr key={e.id} style={{ borderBottom: "1px solid #1e1e1e" }}>
                <td style={{ padding: "12px 14px", color: "#ccc", fontSize: 12, whiteSpace: "nowrap" }}>{e.date}</td>
                <td style={{ padding: "12px 14px", color: "#555", fontSize: 12 }}>
                  {new Date(e.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" })}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>{e.theme || "Open Night"}</div>
                  {e.notes && <div style={{ color: "#F44336", fontSize: 10, marginTop: 2 }}>{e.notes}</div>}
                </td>
                <td style={{ padding: "12px 14px", color: "#888", fontSize: 12, whiteSpace: "nowrap" }}>{e.startTime || "—"}{e.endTime ? " → " + e.endTime : ""}</td>
                <td style={{ padding: "12px 14px", color: e.promoterName ? "#8B5CF6" : "#444", fontSize: 13 }}>{e.promoterName || "—"}</td>
                <td style={{ padding: "12px 14px", color: "#888", fontSize: 11, maxWidth: 180 }}>{e.deals || "—"}</td>
                <td style={{ padding: "12px 14px", color: e.revenue.door ? "#4CAF50" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.revenue.door.toLocaleString()}</td>
                <td style={{ padding: "12px 14px", color: e.revenue.hookah ? "#9C27B0" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.revenue.hookah.toLocaleString()}</td>
                <td style={{ padding: "12px 14px", color: e.revenue.food ? "#4CAF50" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.revenue.food.toFixed(2)}</td>
                <td style={{ padding: "12px 14px", color: e.revenue.bar ? "#8B5CF6" : "#444", fontSize: 12, textAlign: "right" }}>{"$" + e.revenue.bar.toLocaleString()}</td>
                <td style={{ padding: "12px 14px", color: e.revenue.total > 0 ? "#4CAF50" : "#444", fontWeight: "bold", fontSize: 13, textAlign: "right" }}>{"$" + e.revenue.total.toLocaleString()}</td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ padding: "3px 9px", borderRadius: 4, fontSize: 11, fontWeight: "bold",
                    background: (statusColor[e.status] || "#888") + "22",
                    color: statusColor[e.status] || "#888" }}>{e.status}</span>
                </td>
              </tr>
            ))}
            {/* Totals Row */}
            <tr style={{ borderTop: "2px solid #2a2a2a", background: "#161616" }}>
              <td colSpan={6} style={{ padding: "12px 14px", color: "#888", fontSize: 11, fontWeight: "bold", textTransform: "uppercase" }}>TOTALS</td>
              <td style={{ padding: "12px 14px", color: "#4CAF50", fontWeight: "bold", textAlign: "right" }}>{"$" + EVENTS.reduce((s,e) => s+e.revenue.door,0).toLocaleString()}</td>
              <td style={{ padding: "12px 14px", color: "#9C27B0", fontWeight: "bold", textAlign: "right" }}>{"$" + EVENTS.reduce((s,e) => s+e.revenue.hookah,0).toLocaleString()}</td>
              <td style={{ padding: "12px 14px", color: "#4CAF50", fontWeight: "bold", textAlign: "right" }}>{"$" + EVENTS.reduce((s,e) => s+e.revenue.food,0).toFixed(2)}</td>
              <td style={{ padding: "12px 14px", color: "#8B5CF6", fontWeight: "bold", textAlign: "right" }}>{"$" + EVENTS.reduce((s,e) => s+e.revenue.bar,0).toLocaleString()}</td>
              <td style={{ padding: "12px 14px", color: "#fff", fontWeight: "bold", textAlign: "right", fontSize: 14 }}>{"$" + totalRevenue.toLocaleString()}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
