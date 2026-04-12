"use client";
import { useState } from "react";
import Link from "next/link";

type DatabasePayload = {
  sheets: string[];
  data: Record<string, Record<string, unknown>[]>;
};

export default function DatabaseClient({ database }: { database: DatabasePayload }) {
  const [activeSheet, setActiveSheet] = useState(database.sheets[0] || "");

  const rows = database.data[activeSheet] || [];
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>Live Database</h1>
          <p style={{ color: "#666", fontSize: 13 }}>
            Real-time view of all Excel sheets &mdash; {database.sheets.length} sheets total
          </p>
        </div>
        <Link href="/dashboard" style={{
          color: "#8B5CF6", fontSize: 13, textDecoration: "none",
          border: "1px solid #8B5CF644", borderRadius: 6, padding: "8px 14px",
        }}>
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* Sheet tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {database.sheets.map((sheet) => (
          <button
            key={sheet}
            onClick={() => setActiveSheet(sheet)}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "1px solid",
              borderColor: activeSheet === sheet ? "#8B5CF6" : "#1E1B4B",
              background: activeSheet === sheet ? "#8B5CF622" : "#0D0D22",
              color: activeSheet === sheet ? "#8B5CF6" : "#888",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: activeSheet === sheet ? "bold" : "normal",
            }}
          >
            {sheet}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, overflow: "hidden" }}>
        {/* Table header bar */}
        <div style={{
          padding: "14px 20px", borderBottom: "1px solid #2a2a2a",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ color: "#8B5CF6", fontWeight: "bold", fontSize: 14 }}>{activeSheet}</span>
          <span style={{ color: "#555", fontSize: 12 }}>{rows.length} row{rows.length !== 1 ? "s" : ""}</span>
        </div>

        {rows.length === 0 ? (
          <p style={{ color: "#555", padding: "24px 20px", fontSize: 13 }}>No data in this sheet yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col} style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      color: "#888",
                      fontWeight: "bold",
                      borderBottom: "1px solid #2a2a2a",
                      whiteSpace: "nowrap",
                      background: "#090918",
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1e1e1e" }}>
                    {columns.map((col) => (
                      <td key={col} style={{
                        padding: "10px 16px",
                        color: "#ccc",
                        whiteSpace: "nowrap",
                      }}>
                        {String(row[col] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
