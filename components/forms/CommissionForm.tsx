"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { Field, Select, SubmitBtn } from "@/components/FormField";

export default function CommissionForm({ promoters, events, onClose }: {
  promoters: any[]; events: any[]; onClose: () => void;
}) {
  const router = useRouter();
  const [promoterID, setPromoterID] = useState("");
  const [eventID, setEventID] = useState("");
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const promoterOpts = promoters.map(p => ({ value: p.PromoterID, label: `${p.Name} (${p.CommissionType})` }));
  const eventOpts = events.filter(e => e.Status !== "Cancelled").map(e => ({ value: e.EventID, label: `${e.EventName} — ${e.Date}` }));

  const selectedPromoter = promoters.find(p => p.PromoterID === promoterID);
  const selectedEvent = events.find(e => e.EventID === eventID);

  function calcPreview() {
    if (!selectedPromoter || !selectedEvent) return;
    const revenue = parseFloat(selectedEvent.TotalRevenue || 0);
    const guests = parseFloat(selectedEvent.GuestCount || 0);
    const rate = parseFloat(selectedPromoter.CommissionRate || 0);
    let amount = 0;
    if (selectedPromoter.CommissionType === "Flat") amount = rate;
    else if (selectedPromoter.CommissionType === "Percentage") amount = (revenue * rate) / 100;
    else if (selectedPromoter.CommissionType === "Per Head") amount = guests * rate;
    setPreview({ revenue, guests, rate, amount, type: selectedPromoter.CommissionType });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const token = await (window as any).Clerk?.session?.getToken();
      const res = await fetch("http://localhost:4000/api/commissions/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ PromoterID: promoterID, EventID: eventID }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.refresh();
      onClose();
    } catch (err: any) { setError(err.message); }
    setLoading(false);
  }

  return (
    <Modal title="Calculate Commission" onClose={onClose}>
      <form onSubmit={submit}>
        <Field label="Promoter">
          <Select name="PromoterID" value={promoterID} onChange={v => { setPromoterID(v); setPreview(null); }} options={promoterOpts} required />
        </Field>
        <Field label="Event">
          <Select name="EventID" value={eventID} onChange={v => { setEventID(v); setPreview(null); }} options={eventOpts} required />
        </Field>

        {promoterID && eventID && !preview && (
          <button type="button" onClick={calcPreview} style={{
            width: "100%", background: "#16163A", border: "1px solid #333",
            borderRadius: 6, padding: "10px", color: "#8B5CF6",
            fontSize: 13, cursor: "pointer", marginBottom: 16,
          }}>Preview Commission</button>
        )}

        {preview && (
          <div style={{ background: "#090918", borderRadius: 6, padding: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888", fontSize: 12 }}>Event Revenue</span>
              <span style={{ color: "#fff" }}>${preview.revenue.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888", fontSize: 12 }}>Guest Count</span>
              <span style={{ color: "#fff" }}>{preview.guests}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888", fontSize: 12 }}>Commission ({preview.type})</span>
              <span style={{ color: "#fff" }}>
                {preview.type === "Percentage" ? `${preview.rate}%` : preview.type === "Per Head" ? `$${preview.rate}/head` : `$${preview.rate} flat`}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #222", paddingTop: 10 }}>
              <span style={{ color: "#fff", fontWeight: "bold" }}>Commission Owed</span>
              <span style={{ color: "#8B5CF6", fontWeight: "bold", fontSize: 18 }}>${preview.amount.toLocaleString()}</span>
            </div>
          </div>
        )}

        {error && <p style={{ color: "#F44336", fontSize: 12, marginBottom: 8 }}>{error}</p>}
        <SubmitBtn label="Save Commission" loading={loading} />
      </form>
    </Modal>
  );
}
