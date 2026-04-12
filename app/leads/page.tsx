import Shell from "@/components/Shell";
import { LEADS } from "@/lib/data";

export default function LeadsPage() {
  return (
    <Shell>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Leads</h1>
          <p style={{ color: "#666", fontSize: 13 }}>Event inquiries · PowerAutomate integration · {LEADS.length} total leads</p>
        </div>
        <button style={{ background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer" }}>
          + Add Lead
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total Leads",    value: LEADS.length,                                          color: "#8B5CF6" },
          { label: "New",            value: LEADS.filter(l => l.status === "New").length,           color: "#2196F3" },
          { label: "In Progress",    value: LEADS.filter(l => l.status === "In Progress").length,   color: "#FF9800" },
          { label: "Converted",      value: LEADS.filter(l => l.status === "Converted").length,     color: "#4CAF50" },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 28, fontWeight: "bold" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
        {LEADS.length === 0 ? (
          <div style={{ padding: 60, textAlign: "center" }}>
            <div style={{ color: "#444", fontSize: 36, marginBottom: 16 }}>📋</div>
            <div style={{ color: "#555", fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>No Leads Yet</div>
            <div style={{ color: "#444", fontSize: 13 }}>
              Leads will appear here when received via your PowerAutomate flow or manual entry.
            </div>
            <div style={{ color: "#444", fontSize: 12, marginTop: 12 }}>
              Fields: First Name, Last Name, Phone, Email, Source, Date Received, Event Type, Status
            </div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2a2a", background: "#161616" }}>
                {["Name", "Phone", "Email", "Source", "Date Received", "Event Type", "Status"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEADS.map(l => (
                <tr key={l.id} style={{ borderBottom: "1px solid #1e1e1e" }}>
                  <td style={{ padding: "12px 14px", color: "#fff", fontWeight: "bold" }}>{l.firstName} {l.lastName}</td>
                  <td style={{ padding: "12px 14px", color: "#888", fontSize: 13 }}>{l.phone}</td>
                  <td style={{ padding: "12px 14px", color: "#888", fontSize: 13 }}>{l.email}</td>
                  <td style={{ padding: "12px 14px", color: "#8B5CF6", fontSize: 13 }}>{l.source}</td>
                  <td style={{ padding: "12px 14px", color: "#888", fontSize: 13 }}>{l.dateReceived}</td>
                  <td style={{ padding: "12px 14px", color: "#aaa", fontSize: 13 }}>{l.eventType}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ background: "#8B5CF622", color: "#8B5CF6", padding: "3px 9px", borderRadius: 4, fontSize: 10, fontWeight: "bold" }}>{l.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Shell>
  );
}
