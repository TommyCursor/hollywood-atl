"use client";
import { useState } from "react";
import EventForm from "@/components/forms/EventForm";

const statusColor: Record<string, string> = { Upcoming: "#2196F3", Active: "#4CAF50", Completed: "#888", Cancelled: "#F44336" };

export default function EventsClient({ events, promoters }: { events: any[]; promoters: any[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <EventForm promoters={promoters} onClose={() => setOpen(false)} />}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Events</h1>
          <p style={{ color: "#666", fontSize: 13 }}>{events.length} total events</p>
        </div>
        <button onClick={() => setOpen(true)} style={{
          background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6,
          padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer",
        }}>+ Create Event</button>
      </div>

      <div style={{ background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
              {["Event Name","Date","Type","Guests","Ticket","Door","Bar","Table","Total Revenue","Status"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.length === 0
              ? <tr><td colSpan={10} style={{ padding: 32, textAlign: "center", color: "#555" }}>No events yet — click "Create Event" to start</td></tr>
              : events.map((e: any) => (
                <tr key={e.EventID} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "14px 16px", color: "#fff", fontWeight: "bold" }}>{e.EventName}</td>
                  <td style={{ padding: "14px 16px", color: "#aaa", fontSize: 13 }}>{e.Date}</td>
                  <td style={{ padding: "14px 16px", color: "#aaa", fontSize: 13 }}>{e.EventType}</td>
                  <td style={{ padding: "14px 16px", color: "#8B5CF6" }}>{e.GuestCount}</td>
                  <td style={{ padding: "14px 16px", color: "#aaa", fontSize: 13 }}>${parseFloat(e.TicketRevenue || 0).toLocaleString()}</td>
                  <td style={{ padding: "14px 16px", color: "#aaa", fontSize: 13 }}>${parseFloat(e.DoorRevenue || 0).toLocaleString()}</td>
                  <td style={{ padding: "14px 16px", color: "#aaa", fontSize: 13 }}>${parseFloat(e.BarRevenue || 0).toLocaleString()}</td>
                  <td style={{ padding: "14px 16px", color: "#aaa", fontSize: 13 }}>${parseFloat(e.TableRevenue || 0).toLocaleString()}</td>
                  <td style={{ padding: "14px 16px", color: "#4CAF50", fontWeight: "bold" }}>${parseFloat(e.TotalRevenue || 0).toLocaleString()}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: "bold",
                      background: `${statusColor[e.Status] || "#888"}22`, color: statusColor[e.Status] || "#888" }}>{e.Status}</span>
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
