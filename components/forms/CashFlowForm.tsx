"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { Field, Input, Select, Row, SubmitBtn } from "@/components/FormField";

const categories = ["POS Sales","Bar","Door","Ticket","Vendor","Utilities","Labor","Other"].map(v => ({ value: v, label: v }));
const methods = ["Cash","Credit","ACH","Check"].map(v => ({ value: v, label: v }));
const types = [{ value: "Revenue", label: "Revenue" }, { value: "Expense", label: "Expense" }];

export default function CashFlowForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [f, setF] = useState({ Date: today, Type: "Revenue", Category: "", Description: "", Amount: "", PaymentMethod: "", Notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (v: string) => setF(p => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const token = await (window as any).Clerk?.session?.getToken();
      const res = await fetch("http://localhost:4000/api/cash-flow", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...f, Amount: parseFloat(f.Amount) }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.refresh();
      onClose();
    } catch (err: any) { setError(err.message); }
    setLoading(false);
  }

  return (
    <Modal title="Add Cash Flow Entry" onClose={onClose}>
      <form onSubmit={submit}>
        <Row>
          <Field label="Date"><Input name="Date" type="date" value={f.Date} onChange={set("Date")} required /></Field>
          <Field label="Type"><Select name="Type" value={f.Type} onChange={set("Type")} options={types} required /></Field>
        </Row>
        <Row>
          <Field label="Category"><Select name="Category" value={f.Category} onChange={set("Category")} options={categories} required /></Field>
          <Field label="Payment Method"><Select name="PaymentMethod" value={f.PaymentMethod} onChange={set("PaymentMethod")} options={methods} required /></Field>
        </Row>
        <Field label="Description"><Input name="Description" value={f.Description} onChange={set("Description")} placeholder="e.g. Friday Night POS Sales" required /></Field>
        <Field label="Amount ($)"><Input name="Amount" type="number" value={f.Amount} onChange={set("Amount")} placeholder="0.00" required /></Field>
        <Field label="Notes (optional)"><Input name="Notes" value={f.Notes} onChange={set("Notes")} placeholder="Any additional notes" /></Field>
        {error && <p style={{ color: "#F44336", fontSize: 12, marginBottom: 8 }}>{error}</p>}
        <SubmitBtn label="Save Entry" loading={loading} />
      </form>
    </Modal>
  );
}
