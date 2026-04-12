"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { Field, Input, Select, Row, SubmitBtn } from "@/components/FormField";

const eventTypes = ["Club Night","Concert","Private","Holiday","Open Bar","Day Party"].map(v => ({ value: v, label: v }));
const statuses = ["Upcoming","Active","Completed","Cancelled"].map(v => ({ value: v, label: v }));

export default function EventForm({ promoters, onClose }: { promoters: any[]; onClose: () => void }) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [f, setF] = useState({
    EventName: "", Date: today, EventType: "", PromoterID: "",
    TicketRevenue: "0", DoorRevenue: "0", BarRevenue: "0", TableRevenue: "0",
    GuestCount: "0", CapacityLimit: "0", Status: "Upcoming", Notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (v: string) => setF(p => ({ ...p, [k]: v }));
  const promoterOpts = promoters.map(p => ({ value: p.PromoterID, label: p.Name }));

  const totalRevenue = ["TicketRevenue","DoorRevenue","BarRevenue","TableRevenue"]
    .reduce((s, k) => s + parseFloat((f as any)[k] || 0), 0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const token = await (window as any).Clerk?.session?.getToken();
      const res = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...f,
          TicketRevenue: parseFloat(f.TicketRevenue), DoorRevenue: parseFloat(f.DoorRevenue),
          BarRevenue: parseFloat(f.BarRevenue), TableRevenue: parseFloat(f.TableRevenue),
          GuestCount: parseInt(f.GuestCount), CapacityLimit: parseInt(f.CapacityLimit),
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.refresh();
      onClose();
    } catch (err: any) { setError(err.message); }
    setLoading(false);
  }

  return (
    <Modal title="Create Event" onClose={onClose}>
      <form onSubmit={submit}>
        <Field label="Event Name"><Input name="EventName" value={f.EventName} onChange={set("EventName")} placeholder="e.g. Trap Night" required /></Field>
        <Row>
          <Field label="Date"><Input name="Date" type="date" value={f.Date} onChange={set("Date")} required /></Field>
          <Field label="Event Type"><Select name="EventType" value={f.EventType} onChange={set("EventType")} options={eventTypes} required /></Field>
        </Row>
        <Row>
          <Field label="Promoter"><Select name="PromoterID" value={f.PromoterID} onChange={set("PromoterID")} options={promoterOpts} /></Field>
          <Field label="Status"><Select name="Status" value={f.Status} onChange={set("Status")} options={statuses} required /></Field>
        </Row>
        <Row>
          <Field label="Guest Count"><Input name="GuestCount" type="number" value={f.GuestCount} onChange={set("GuestCount")} /></Field>
          <Field label="Capacity Limit"><Input name="CapacityLimit" type="number" value={f.CapacityLimit} onChange={set("CapacityLimit")} /></Field>
        </Row>

        <p style={{ color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Revenue Breakdown</p>
        <Row>
          <Field label="Ticket Revenue ($)"><Input name="TicketRevenue" type="number" value={f.TicketRevenue} onChange={set("TicketRevenue")} /></Field>
          <Field label="Door Revenue ($)"><Input name="DoorRevenue" type="number" value={f.DoorRevenue} onChange={set("DoorRevenue")} /></Field>
        </Row>
        <Row>
          <Field label="Bar Revenue ($)"><Input name="BarRevenue" type="number" value={f.BarRevenue} onChange={set("BarRevenue")} /></Field>
          <Field label="Table Revenue ($)"><Input name="TableRevenue" type="number" value={f.TableRevenue} onChange={set("TableRevenue")} /></Field>
        </Row>
        <div style={{ background: "#090918", borderRadius: 6, padding: "10px 14px", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#888", fontSize: 13 }}>Total Revenue</span>
          <span style={{ color: "#4CAF50", fontWeight: "bold" }}>${totalRevenue.toLocaleString()}</span>
        </div>
        <Field label="Notes (optional)"><Input name="Notes" value={f.Notes} onChange={set("Notes")} placeholder="Any additional notes" /></Field>
        {error && <p style={{ color: "#F44336", fontSize: 12, marginBottom: 8 }}>{error}</p>}
        <SubmitBtn label="Create Event" loading={loading} />
      </form>
    </Modal>
  );
}
