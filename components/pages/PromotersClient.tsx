"use client";
import { useState } from "react";
import PromoterForm from "@/components/forms/PromoterForm";
import CommissionForm from "@/components/forms/CommissionForm";

export default function PromotersClient({ promoters, commissions, events }: { promoters: any[]; commissions: any[]; events: any[] }) {
  const [openPromoter, setOpenPromoter] = useState(false);
  const [openCommission, setOpenCommission] = useState(false);

  return (
    <>
      {openPromoter && <PromoterForm onClose={() => setOpenPromoter(false)} />}
      {openCommission && <CommissionForm promoters={promoters} events={events} onClose={() => setOpenCommission(false)} />}

      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Promoters</h1>
          <p style={{ color: "#666", fontSize: 13 }}>{promoters.length} active promoters</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setOpenCommission(true)} style={{
            background: "transparent", color: "#8B5CF6", border: "1px solid #8B5CF6",
            borderRadius: 6, padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer",
          }}>Calculate Commission</button>
          <button onClick={() => setOpenPromoter(true)} style={{
            background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6,
            padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer",
          }}>+ Add Promoter</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1, background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
                {["Name","Phone","Email","Commission Type","Rate","Status"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {promoters.length === 0
                ? <tr><td colSpan={6} style={{ padding: 32, textAlign: "center", color: "#555" }}>No promoters yet — click "Add Promoter" to start</td></tr>
                : promoters.map((p: any) => (
                  <tr key={p.PromoterID} style={{ borderBottom: "1px solid #222" }}>
                    <td style={{ padding: "12px 16px", color: "#fff", fontWeight: "bold" }}>{p.Name}</td>
                    <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 13 }}>{p.Phone}</td>
                    <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 13 }}>{p.Email}</td>
                    <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 13 }}>{p.CommissionType}</td>
                    <td style={{ padding: "12px 16px", color: "#8B5CF6", fontWeight: "bold" }}>
                      {p.CommissionType === "Percentage" ? `${p.CommissionRate}%` : p.CommissionType === "Per Head" ? `$${p.CommissionRate}/head` : `$${p.CommissionRate}`}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: "bold",
                        background: p.Status === "Active" ? "#4CAF5022" : "#88888822",
                        color: p.Status === "Active" ? "#4CAF50" : "#888" }}>{p.Status}</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div style={{ width: 340, background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, padding: 20 }}>
          <h2 style={{ color: "#8B5CF6", fontSize: 13, fontWeight: "bold", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Commission History</h2>
          {commissions.length === 0
            ? <p style={{ color: "#555", fontSize: 13 }}>No commissions yet</p>
            : commissions.map((c: any) => (
              <div key={c.CommissionID} style={{ borderBottom: "1px solid #222", paddingBottom: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: "bold" }}>{c.PromoterName}</span>
                  <span style={{ color: "#8B5CF6", fontWeight: "bold" }}>${parseFloat(c.CommissionAmount).toLocaleString()}</span>
                </div>
                <div style={{ color: "#888", fontSize: 11 }}>{c.EventName} · {c.EventDate}</div>
                <div style={{ color: "#666", fontSize: 11 }}>{c.GuestCount} guests</div>
                <span style={{ display: "inline-block", marginTop: 4, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: "bold",
                  background: c.Status === "Paid" ? "#4CAF5022" : "#FFC10722",
                  color: c.Status === "Paid" ? "#4CAF50" : "#FFC107" }}>{c.Status}</span>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
