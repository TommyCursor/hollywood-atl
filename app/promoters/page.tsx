import Shell from "@/components/Shell";
import { PROMOTERS, EVENTS } from "@/lib/data";

export default function PromotersPage() {
  return (
    <Shell>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Promoters</h1>
          <p style={{ color: "#666", fontSize: 13 }}>{PROMOTERS.length} promoters · March 2026</p>
        </div>
        <button style={{ background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer" }}>
          + Add Promoter
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
        {/* Promoters Table */}
        <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2a2a", background: "#161616" }}>
                {["Promoter", "Phone", "Deal Type", "Door %", "Bar %", "Flat Fee", "Events"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROMOTERS.map(p => {
                const pEvents = EVENTS.filter(e => e.promoterId === p.id);
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid #1e1e1e" }}>
                    <td style={{ padding: "12px 14px", color: "#fff", fontWeight: "bold", fontSize: 14 }}>{p.name}</td>
                    <td style={{ padding: "12px 14px", color: "#888", fontSize: 13 }}>{p.phone || "—"}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{ background: "#8B5CF622", color: "#8B5CF6", padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: "bold" }}>
                        {p.dealType}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", color: p.doorPct ? "#2196F3" : "#444", fontWeight: "bold" }}>{p.doorPct ? p.doorPct + "%" : "—"}</td>
                    <td style={{ padding: "12px 14px", color: p.barPct ? "#8B5CF6" : "#444", fontWeight: "bold" }}>{p.barPct ? p.barPct + "%" : "—"}</td>
                    <td style={{ padding: "12px 14px", color: p.flatFee ? "#4CAF50" : "#444", fontWeight: "bold" }}>{p.flatFee ? "$" + p.flatFee : "—"}</td>
                    <td style={{ padding: "12px 14px", color: "#888" }}>{pEvents.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Promoter Event History */}
        <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: 20 }}>
          <div style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 16 }}>
            Event History
          </div>
          {EVENTS.filter(e => e.promoterName).map(e => (
            <div key={e.id} style={{ borderBottom: "1px solid #1e1e1e", paddingBottom: 12, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>{e.promoterName}</span>
                <span style={{ color: e.revenue.total > 0 ? "#4CAF50" : "#444", fontWeight: "bold" }}>{"$" + e.revenue.total.toLocaleString()}</span>
              </div>
              <div style={{ color: "#888", fontSize: 12 }}>{e.theme || "Open Night"} · {e.date}</div>
              {e.deals && <div style={{ color: "#8B5CF6", fontSize: 11, marginTop: 4 }}>{e.deals}</div>}
              {e.revenue.door > 0 && (
                <div style={{ color: "#666", fontSize: 11, marginTop: 4 }}>
                  Door: {"$" + e.revenue.door.toLocaleString()} · Bar: {"$" + e.revenue.bar.toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
