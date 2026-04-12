"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { Field, Input, Select, Row, SubmitBtn } from "@/components/FormField";

const commissionTypes = [
  { value: "Percentage", label: "Percentage of Revenue" },
  { value: "Flat", label: "Flat Fee" },
  { value: "Per Head", label: "Per Head (per guest)" },
];

export default function PromoterForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [f, setF] = useState({ Name: "", Phone: "", Email: "", CommissionType: "Percentage", CommissionRate: "", Status: "Active", JoinDate: today });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (v: string) => setF(p => ({ ...p, [k]: v }));

  const rateLabel = f.CommissionType === "Percentage" ? "Commission Rate (%)"
    : f.CommissionType === "Per Head" ? "Rate Per Guest ($)"
    : "Flat Fee Amount ($)";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const token = await (window as any).Clerk?.session?.getToken();
      const res = await fetch("http://localhost:4000/api/promoters", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...f, CommissionRate: parseFloat(f.CommissionRate) }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.refresh();
      onClose();
    } catch (err: any) { setError(err.message); }
    setLoading(false);
  }

  return (
    <Modal title="Add Promoter" onClose={onClose}>
      <form onSubmit={submit}>
        <Field label="Full Name"><Input name="Name" value={f.Name} onChange={set("Name")} placeholder="e.g. Jay Thomas" required /></Field>
        <Row>
          <Field label="Phone"><Input name="Phone" type="tel" value={f.Phone} onChange={set("Phone")} placeholder="4045550101" required /></Field>
          <Field label="Email"><Input name="Email" type="email" value={f.Email} onChange={set("Email")} placeholder="jay@email.com" /></Field>
        </Row>
        <Row>
          <Field label="Commission Type">
            <Select name="CommissionType" value={f.CommissionType} onChange={set("CommissionType")} options={commissionTypes} required />
          </Field>
          <Field label={rateLabel}>
            <Input name="CommissionRate" type="number" value={f.CommissionRate} onChange={set("CommissionRate")} placeholder="0" required />
          </Field>
        </Row>
        <Field label="Join Date"><Input name="JoinDate" type="date" value={f.JoinDate} onChange={set("JoinDate")} required /></Field>
        {error && <p style={{ color: "#F44336", fontSize: 12, marginBottom: 8 }}>{error}</p>}
        <SubmitBtn label="Add Promoter" loading={loading} />
      </form>
    </Modal>
  );
}
