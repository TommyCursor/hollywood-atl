"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import PayrollForm from "@/components/forms/PayrollForm";

const BASE = "http://localhost:4000/api";
const statusColor: Record<string, string> = { Pending: "#FFC107", Approved: "#2196F3", Paid: "#4CAF50" };

type PayrollEntry = { [key: string]: any };
type Employee = { [key: string]: any };

function SendEmailModal({ payroll, employees, onClose }: {
  payroll: PayrollEntry;
  employees: Employee[];
  onClose: () => void;
}) {
  const emp = employees.find((e) => e.EmployeeID === payroll.EmployeeID);
  const [email, setEmail] = useState(emp?.Email || "");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!email) { setError("Enter a recipient email."); return; }
    setSending(true);
    setError("");
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const res = await fetch(`${BASE}/email/send-payroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ payroll, recipientEmail: email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div style={{ background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 12, width: 480, padding: 32 }}>
        {sent ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <h2 style={{ color: "#4CAF50", marginBottom: 8 }}>Email Sent</h2>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>
              Payroll notification sent to <strong style={{ color: "#fff" }}>{email}</strong>
            </p>
            <button onClick={onClose} style={{
              background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6,
              padding: "10px 24px", fontWeight: "bold", cursor: "pointer",
            }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ color: "#fff", fontSize: 18, marginBottom: 4 }}>Send Payroll Email</h2>
              <p style={{ color: "#666", fontSize: 13 }}>AI will draft and send a payroll notification with a full report.</p>
            </div>

            {/* Payroll summary */}
            <div style={{ background: "#090918", borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <div style={{ color: "#8B5CF6", fontWeight: "bold", marginBottom: 10 }}>{payroll.EmployeeName}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 0", fontSize: 12 }}>
                {[
                  ["Pay Period", `${payroll.WeekStart} → ${payroll.WeekEnd}`],
                  ["Hours", `${payroll.HoursWorked} hrs`],
                  ["Base Pay", `$${parseFloat(payroll.BasePay || 0).toFixed(2)}`],
                  ["Total Tips", `$${parseFloat(payroll.TotalTips || 0).toFixed(2)}`],
                  ["Total Pay", `$${parseFloat(payroll.TotalPay || 0).toFixed(2)}`],
                ].map(([label, val]) => (
                  <>
                    <span key={label + "l"} style={{ color: "#666" }}>{label}</span>
                    <span key={label + "v"} style={{ color: label === "Total Pay" ? "#4CAF50" : "#aaa", fontWeight: label === "Total Pay" ? "bold" : "normal" }}>{val}</span>
                  </>
                ))}
              </div>
            </div>

            {/* Email dropdown or input */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "#888", fontSize: 12, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                Recipient Email
              </label>
              {employees.filter(e => e.Email).length > 0 ? (
                <select
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%", background: "#090918", border: "1px solid #333",
                    borderRadius: 6, padding: "10px 12px", color: "#fff", fontSize: 13,
                  }}
                >
                  <option value="">— Select employee email —</option>
                  {employees.filter(e => e.Email).map(e => (
                    <option key={e.EmployeeID} value={e.Email}>{e.Name} — {e.Email}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="employee@email.com"
                  style={{
                    width: "100%", background: "#090918", border: "1px solid #333",
                    borderRadius: 6, padding: "10px 12px", color: "#fff", fontSize: 13,
                    boxSizing: "border-box",
                  }}
                />
              )}
            </div>

            {error && (
              <div style={{ background: "#F4433622", border: "1px solid #F44336", borderRadius: 6, padding: "10px 14px", color: "#F44336", fontSize: 13, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{
                flex: 1, background: "transparent", border: "1px solid #333", borderRadius: 6,
                padding: "10px", color: "#888", fontSize: 13, cursor: "pointer",
              }}>Cancel</button>
              <button onClick={handleSend} disabled={sending} style={{
                flex: 2, background: sending ? "#444" : "#8B5CF6", color: "#000", border: "none",
                borderRadius: 6, padding: "10px", fontWeight: "bold", fontSize: 13,
                cursor: sending ? "not-allowed" : "pointer",
              }}>
                {sending ? "AI drafting & sending..." : "Send Email"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PayrollClient({ payroll, employees }: { payroll: any[]; employees: any[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [emailTarget, setEmailTarget] = useState<PayrollEntry | null>(null);
  const router = useRouter();
  const total = payroll.reduce((s, p) => s + parseFloat(p.TotalPay || 0), 0);
  const pending = payroll.filter(p => p.Status === "Pending").length;
  const approved = payroll.filter(p => p.Status === "Approved").length;

  async function updateStatus(id: string, action: "approve" | "paid") {
    setLoading(id + action);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    await fetch(`${BASE}/payroll/${id}/${action}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(null);
    router.refresh();
  }

  return (
    <>
      {open && <PayrollForm employees={employees} onClose={() => setOpen(false)} />}
      {emailTarget && (
        <SendEmailModal payroll={emailTarget} employees={employees} onClose={() => setEmailTarget(null)} />
      )}

      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Payroll</h1>
          <p style={{ color: "#666", fontSize: 13 }}>{payroll.length} records · {pending} pending · {approved} approved</p>
        </div>
        <button onClick={() => setOpen(true)} style={{
          background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6,
          padding: "10px 20px", fontWeight: "bold", fontSize: 13, cursor: "pointer",
        }}>+ Add Payroll Entry</button>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Payroll", value: `$${total.toLocaleString()}`, color: "#8B5CF6" },
          { label: "Pending", value: String(pending), color: "#FFC107" },
          { label: "Approved", value: String(approved), color: "#2196F3" },
          { label: "Paid", value: String(payroll.filter(p => p.Status === "Paid").length), color: "#4CAF50" },
        ].map(c => (
          <div key={c.label} style={{ flex: 1, background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, padding: "20px 24px" }}>
            <div style={{ color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{c.label}</div>
            <div style={{ color: c.color, fontSize: 28, fontWeight: "bold" }}>{c.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
              {["Employee","Week","Hours","Base Pay","Tips","Total Pay","Status","Actions"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payroll.length === 0
              ? <tr><td colSpan={8} style={{ padding: 32, textAlign: "center", color: "#555" }}>No payroll records yet — click "Add Payroll Entry" to start</td></tr>
              : payroll.map((p: any) => (
                <tr key={p.PayrollID} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "12px 16px", color: "#fff", fontWeight: "bold" }}>{p.EmployeeName}</td>
                  <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 12 }}>{p.WeekStart} → {p.WeekEnd}</td>
                  <td style={{ padding: "12px 16px", color: "#aaa" }}>{p.HoursWorked}h</td>
                  <td style={{ padding: "12px 16px", color: "#aaa" }}>${parseFloat(p.BasePay || 0).toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", color: "#8B5CF6" }}>${parseFloat(p.TotalTips || 0).toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", color: "#4CAF50", fontWeight: "bold" }}>${parseFloat(p.TotalPay || 0).toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: "bold",
                      background: `${statusColor[p.Status] || "#888"}22`, color: statusColor[p.Status] || "#888" }}>{p.Status}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.Status === "Pending" && (
                        <button onClick={() => updateStatus(p.PayrollID, "approve")} disabled={loading === p.PayrollID + "approve"}
                          style={{ background: "#2196F322", color: "#2196F3", border: "1px solid #2196F3", borderRadius: 4, padding: "4px 10px", fontSize: 11, fontWeight: "bold", cursor: "pointer" }}>
                          {loading === p.PayrollID + "approve" ? "..." : "Approve"}
                        </button>
                      )}
                      {p.Status === "Approved" && (
                        <button onClick={() => updateStatus(p.PayrollID, "paid")} disabled={loading === p.PayrollID + "paid"}
                          style={{ background: "#4CAF5022", color: "#4CAF50", border: "1px solid #4CAF50", borderRadius: 4, padding: "4px 10px", fontSize: 11, fontWeight: "bold", cursor: "pointer" }}>
                          {loading === p.PayrollID + "paid" ? "..." : "Mark Paid"}
                        </button>
                      )}
                      <button onClick={() => setEmailTarget(p)}
                        style={{ background: "#8B5CF622", color: "#8B5CF6", border: "1px solid #8B5CF644", borderRadius: 4, padding: "4px 10px", fontSize: 11, fontWeight: "bold", cursor: "pointer" }}>
                        Send Email
                      </button>
                      {p.Status === "Paid" && (
                        <span style={{ color: "#4CAF50", fontSize: 11, alignSelf: "center" }}>✓ Done</span>
                      )}
                    </div>
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
