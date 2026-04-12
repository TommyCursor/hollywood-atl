import Shell from "@/components/Shell";
import { EMPLOYEES } from "@/lib/data";

export default function EmployeesPage() {
  const byRole = EMPLOYEES.reduce((acc, e) => {
    acc[e.role] = (acc[e.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusColor: Record<string, string> = { Active: "#4CAF50", Training: "#FFC107", "On Hold": "#F44336" };

  return (
    <Shell>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Employees</h1>
          <p style={{ color: "#666", fontSize: 13 }}>{EMPLOYEES.length} total · {EMPLOYEES.filter(e => e.status === "Active").length} active · {EMPLOYEES.filter(e => e.status === "Training").length} in training</p>
        </div>
        <button style={{ background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer" }}>
          + Add Employee
        </button>
      </div>

      {/* Role Breakdown */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: 16, marginBottom: 22, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.entries(byRole).sort((a, b) => b[1] - a[1]).map(([role, count]) => (
          <div key={role} style={{ background: "#090918", border: "1px solid #2a2a2a", borderRadius: 6, padding: "6px 12px" }}>
            <span style={{ color: "#8B5CF6", fontWeight: "bold" }}>{count}</span>
            <span style={{ color: "#777", fontSize: 12, marginLeft: 6 }}>{role}</span>
          </div>
        ))}
      </div>

      {/* Employees Table */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a", background: "#161616" }}>
              {["#", "Name", "Role", "Pay Type", "Rate / hr", "Phone", "Instagram", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.map((e, i) => (
              <tr key={e.id} style={{ borderBottom: "1px solid #1e1e1e" }}>
                <td style={{ padding: "11px 14px", color: "#444", fontSize: 12 }}>{i + 1}</td>
                <td style={{ padding: "11px 14px", color: "#fff", fontWeight: "bold", fontSize: 14 }}>{e.name}</td>
                <td style={{ padding: "11px 14px" }}>
                  <span style={{ background: "#8B5CF618", color: "#8B5CF6", padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: "bold" }}>
                    {e.role}
                  </span>
                </td>
                <td style={{ padding: "11px 14px", color: "#888", fontSize: 12 }}>{e.payType}</td>
                <td style={{ padding: "11px 14px", color: e.rate ? "#8B5CF6" : "#444", fontWeight: e.rate ? "bold" : "normal" }}>
                  {e.rate ? "$" + e.rate + "/hr" : "—"}
                </td>
                <td style={{ padding: "11px 14px", color: "#666", fontSize: 12 }}>{e.phone || "—"}</td>
                <td style={{ padding: "11px 14px", color: "#666", fontSize: 12 }}>{e.instagram || "—"}</td>
                <td style={{ padding: "11px 14px" }}>
                  <span style={{ padding: "3px 9px", borderRadius: 4, fontSize: 11, fontWeight: "bold",
                    background: (statusColor[e.status] || "#888") + "22",
                    color: statusColor[e.status] || "#888" }}>{e.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
