"use client";
import { useState } from "react";
import EmployeeForm from "@/components/forms/EmployeeForm";

export default function EmployeesClient({ employees }: { employees: any[] }) {
  const [open, setOpen] = useState(false);
  const active = employees.filter(e => e.Status === "Active").length;

  return (
    <>
      {open && <EmployeeForm onClose={() => setOpen(false)} />}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Employees</h1>
          <p style={{ color: "#666", fontSize: 13 }}>{employees.length} total · {active} active</p>
        </div>
        <button onClick={() => setOpen(true)} style={{
          background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6,
          padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer",
        }}>+ Add Employee</button>
      </div>

      <div style={{ background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
              {["Name","Role","Pay Type","Rate","Hire Date","Status"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.length === 0
              ? <tr><td colSpan={6} style={{ padding: 32, textAlign: "center", color: "#555" }}>No employees yet — click "Add Employee" to start</td></tr>
              : employees.map((e: any) => (
                <tr key={e.EmployeeID} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "12px 16px", color: "#fff", fontWeight: "bold" }}>{e.Name}</td>
                  <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 13 }}>{e.Role}</td>
                  <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 13 }}>{e.PayType}</td>
                  <td style={{ padding: "12px 16px", color: "#8B5CF6", fontWeight: "bold" }}>
                    ${parseFloat(e.Rate).toLocaleString()}{e.PayType === "Hourly" ? "/hr" : "/yr"}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 13 }}>{e.HireDate}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: "bold",
                      background: e.Status === "Active" ? "#4CAF5022" : "#88888822",
                      color: e.Status === "Active" ? "#4CAF50" : "#888" }}>{e.Status}</span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
