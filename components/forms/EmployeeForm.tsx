"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { Field, Input, Select, Row, SubmitBtn } from "@/components/FormField";

const roles = ["Bartender","Server","Security","DJ","Host","Manager","Barback","Promoter","Other"].map(v => ({ value: v, label: v }));
const payTypes = [{ value: "Hourly", label: "Hourly" }, { value: "Salary", label: "Salary" }];
const statuses = [{ value: "Active", label: "Active" }, { value: "Inactive", label: "Inactive" }];

export default function EmployeeForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [f, setF] = useState({ Name: "", Role: "", PayType: "Hourly", Rate: "", Status: "Active", HireDate: today });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (v: string) => setF(p => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const token = await (window as any).Clerk?.session?.getToken();
      const res = await fetch("http://localhost:4000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...f, Rate: parseFloat(f.Rate) }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.refresh();
      onClose();
    } catch (err: any) { setError(err.message); }
    setLoading(false);
  }

  return (
    <Modal title="Add Employee" onClose={onClose}>
      <form onSubmit={submit}>
        <Field label="Full Name"><Input name="Name" value={f.Name} onChange={set("Name")} placeholder="e.g. Marcus Williams" required /></Field>
        <Row>
          <Field label="Role"><Select name="Role" value={f.Role} onChange={set("Role")} options={roles} required /></Field>
          <Field label="Status"><Select name="Status" value={f.Status} onChange={set("Status")} options={statuses} required /></Field>
        </Row>
        <Row>
          <Field label="Pay Type"><Select name="PayType" value={f.PayType} onChange={set("PayType")} options={payTypes} required /></Field>
          <Field label={f.PayType === "Hourly" ? "Hourly Rate ($)" : "Annual Salary ($)"}>
            <Input name="Rate" type="number" value={f.Rate} onChange={set("Rate")} placeholder="0.00" required />
          </Field>
        </Row>
        <Field label="Hire Date"><Input name="HireDate" type="date" value={f.HireDate} onChange={set("HireDate")} required /></Field>
        {error && <p style={{ color: "#F44336", fontSize: 12, marginBottom: 8 }}>{error}</p>}
        <SubmitBtn label="Add Employee" loading={loading} />
      </form>
    </Modal>
  );
}
