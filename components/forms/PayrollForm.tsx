"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { Field, Input, Select, Row, SubmitBtn } from "@/components/FormField";

export default function PayrollForm({ employees, onClose }: { employees: any[]; onClose: () => void }) {
  const router = useRouter();
  const today = new Date();
  const monday = new Date(today); monday.setDate(today.getDate() - today.getDay() + 1);
  const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const [f, setF] = useState({
    EmployeeID: "", WeekStart: fmt(monday), WeekEnd: fmt(sunday),
    HoursWorked: "", TipsCredit: "0", TipsCash: "0", TipsPooled: "0",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (v: string) => setF(p => ({ ...p, [k]: v }));
  const empOpts = employees.filter(e => e.Status === "Active").map(e => ({ value: e.EmployeeID, label: `${e.Name} (${e.Role})` }));
  const selectedEmp = employees.find(e => e.EmployeeID === f.EmployeeID);

  const basePay = selectedEmp?.PayType === "Hourly"
    ? parseFloat(f.HoursWorked || "0") * parseFloat(selectedEmp?.Rate || "0")
    : parseFloat(selectedEmp?.Rate || "0") / 52;
  const totalTips = parseFloat(f.TipsCredit || "0") + parseFloat(f.TipsCash || "0") + parseFloat(f.TipsPooled || "0");
  const totalPay = basePay + totalTips;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const token = await (window as any).Clerk?.session?.getToken();
      const res = await fetch("http://localhost:4000/api/payroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...f,
          EmployeeName: selectedEmp?.Name,
          BaseRate: selectedEmp?.Rate,
          HoursWorked: parseFloat(f.HoursWorked || "0"),
          TipsCredit: parseFloat(f.TipsCredit || "0"),
          TipsCash: parseFloat(f.TipsCash || "0"),
          TipsPooled: parseFloat(f.TipsPooled || "0"),
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.refresh();
      onClose();
    } catch (err: any) { setError(err.message); }
    setLoading(false);
  }

  return (
    <Modal title="Add Payroll Entry" onClose={onClose}>
      <form onSubmit={submit}>
        <Field label="Employee">
          <Select name="EmployeeID" value={f.EmployeeID} onChange={set("EmployeeID")} options={empOpts} required />
        </Field>
        <Row>
          <Field label="Week Start"><Input name="WeekStart" type="date" value={f.WeekStart} onChange={set("WeekStart")} required /></Field>
          <Field label="Week End"><Input name="WeekEnd" type="date" value={f.WeekEnd} onChange={set("WeekEnd")} required /></Field>
        </Row>
        {selectedEmp?.PayType === "Hourly" && (
          <Field label="Hours Worked">
            <Input name="HoursWorked" type="number" value={f.HoursWorked} onChange={set("HoursWorked")} placeholder="0" required />
          </Field>
        )}

        <p style={{ color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, margin: "4px 0 12px" }}>Tips</p>
        <Row>
          <Field label="Credit Card Tips ($)"><Input name="TipsCredit" type="number" value={f.TipsCredit} onChange={set("TipsCredit")} /></Field>
          <Field label="Cash Tips ($)"><Input name="TipsCash" type="number" value={f.TipsCash} onChange={set("TipsCash")} /></Field>
        </Row>
        <Field label="Pooled Tips ($)"><Input name="TipsPooled" type="number" value={f.TipsPooled} onChange={set("TipsPooled")} /></Field>

        {/* Live Pay Preview */}
        {selectedEmp && (
          <div style={{ background: "#090918", borderRadius: 6, padding: 14, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#888", fontSize: 12 }}>Base Pay</span>
              <span style={{ color: "#fff" }}>${basePay.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#888", fontSize: 12 }}>Total Tips</span>
              <span style={{ color: "#8B5CF6" }}>${totalTips.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #222", paddingTop: 8 }}>
              <span style={{ color: "#fff", fontWeight: "bold" }}>Total Pay</span>
              <span style={{ color: "#4CAF50", fontWeight: "bold", fontSize: 16 }}>${totalPay.toFixed(2)}</span>
            </div>
          </div>
        )}
        {error && <p style={{ color: "#F44336", fontSize: 12, marginBottom: 8 }}>{error}</p>}
        <SubmitBtn label="Save Payroll Entry" loading={loading} />
      </form>
    </Modal>
  );
}
