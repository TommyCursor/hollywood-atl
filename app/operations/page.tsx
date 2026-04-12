"use client";
import Shell from "@/components/Shell";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

const BASE = "http://localhost:4000/api";

function ActionCard({ title, description, icon, children }: {
  title: string; description: string; icon: string; children: React.ReactNode;
}) {
  return (
    <div style={{ background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        <div>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>{title}</div>
          <div style={{ color: "#666", fontSize: 12 }}>{description}</div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: 20, marginTop: 16 }}>{children}</div>
    </div>
  );
}

function Btn({ label, color = "#8B5CF6", textColor = "#000", onClick, disabled }: {
  label: string; color?: string; textColor?: string; onClick: () => void; disabled?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? "#333" : color, color: disabled ? "#666" : textColor,
      border: "none", borderRadius: 6, padding: "10px 20px",
      fontWeight: "bold", fontSize: 13, cursor: disabled ? "not-allowed" : "pointer",
      transition: "opacity 0.15s",
    }}>{label}</button>
  );
}

function ErrorResult({ data }: { data: any }) {
  if (!data?.error) return null;
  return (
    <div style={{ marginTop: 16, padding: 12, borderRadius: 6, background: "#F4433611", border: "1px solid #F44336", color: "#F44336", fontSize: 13 }}>
      {data.error}
    </div>
  );
}

function PayrollSlip({ data, onPrint }: { data: any; onPrint: () => void }) {
  if (!data || data.error) return null;
  const totalBase = data.generated.reduce((s: number, e: any) => s + parseFloat(e.BaseRate || 0), 0);

  return (
    <div style={{ marginTop: 20 }}>
      {/* Slip */}
      <div id="payroll-slip" style={{
        background: "#0d0d0d", border: "1px solid #8B5CF6", borderRadius: 10,
        padding: 28, fontFamily: "monospace", maxWidth: 560,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 20, borderBottom: "1px dashed #333", paddingBottom: 16 }}>
          <div style={{ color: "#8B5CF6", fontSize: 20, fontWeight: "bold", letterSpacing: 2 }}>HOLLYWOOD ATL</div>
          <div style={{ color: "#666", fontSize: 11, marginTop: 4 }}>PAYROLL INITIALIZATION SLIP</div>
        </div>

        {/* Period */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 12 }}>
          <div>
            <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase" }}>Pay Period</div>
            <div style={{ color: "#fff", marginTop: 2 }}>{data.generated[0]?.WeekStart} → {data.generated[0]?.WeekEnd}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase" }}>Generated</div>
            <div style={{ color: "#fff", marginTop: 2 }}>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px dashed #2a2a2a", marginBottom: 16 }} />

        {/* Employee rows */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "4px 16px", marginBottom: 8 }}>
            <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase" }}>Employee</div>
            <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", textAlign: "right" }}>Pay Type</div>
            <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", textAlign: "right" }}>Base Rate</div>
          </div>
          {data.generated.map((emp: any, i: number) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr auto auto", gap: "4px 16px",
              padding: "10px 0", borderBottom: "1px solid #1a1a1a",
            }}>
              <div style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>{emp.EmployeeName}</div>
              <div style={{ color: "#aaa", fontSize: 12, textAlign: "right" }}>{emp.PayType}</div>
              <div style={{ color: "#8B5CF6", fontSize: 13, fontWeight: "bold", textAlign: "right" }}>
                ${parseFloat(emp.BaseRate || 0).toFixed(2)}/hr
              </div>
            </div>
          ))}
        </div>

        {/* Skipped */}
        {data.skipped?.length > 0 && (
          <div style={{ marginBottom: 16, padding: "8px 12px", background: "#FFC10711", border: "1px solid #FFC107", borderRadius: 6 }}>
            <div style={{ color: "#FFC107", fontSize: 11, fontWeight: "bold" }}>SKIPPED (already have payroll this week)</div>
            <div style={{ color: "#aaa", fontSize: 12, marginTop: 4 }}>{data.skipped.join(", ")}</div>
          </div>
        )}

        {/* Summary */}
        <div style={{ borderTop: "1px dashed #2a2a2a", paddingTop: 16, marginTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#888", fontSize: 12 }}>Employees Initialized</span>
            <span style={{ color: "#fff", fontWeight: "bold" }}>{data.generated.length}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#888", fontSize: 12 }}>Status</span>
            <span style={{ color: "#FFC107", fontWeight: "bold", fontSize: 12 }}>PENDING — Awaiting Hours & Tips</span>
          </div>
        </div>

        {/* Footer note */}
        <div style={{ borderTop: "1px dashed #2a2a2a", marginTop: 16, paddingTop: 14, textAlign: "center" }}>
          <div style={{ color: "#444", fontSize: 10 }}>
            Go to Payroll page → Add Payroll Entry to enter hours & tips for each employee
          </div>
        </div>
      </div>

      {/* Print button */}
      <div style={{ marginTop: 12 }}>
        <Btn label="Print Slip" color="#333" textColor="#fff" onClick={onPrint} />
      </div>
    </div>
  );
}

export default function OperationsPage() {
  async function authHeaders(extra?: Record<string, string>) {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    return { Authorization: `Bearer ${token}`, ...extra };
  }

  // ── Import POS Data ──────────────────────────────────────────
  const [posFile, setPosFile] = useState<File | null>(null);
  const [posResult, setPosResult] = useState<any>(null);
  const [posLoading, setPosLoading] = useState(false);

  async function importPOS() {
    if (!posFile) return;
    setPosLoading(true);
    const fd = new FormData();
    fd.append("file", posFile);
    try {
      const res = await fetch(`${BASE}/pos/import`, { method: "POST", headers: await authHeaders(), body: fd });
      setPosResult(await res.json());
    } catch (e: any) { setPosResult({ error: e.message }); }
    setPosLoading(false);
  }

  // ── Generate Payroll ─────────────────────────────────────────
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const [weekStart, setWeekStart] = useState(fmt(monday));
  const [weekEnd, setWeekEnd] = useState(fmt(sunday));
  const [payrollResult, setPayrollResult] = useState<any>(null);
  const [payrollLoading, setPayrollLoading] = useState(false);

  async function generatePayroll() {
    setPayrollLoading(true);
    try {
      const res = await fetch(`${BASE}/reports/generate-payroll`, {
        method: "POST",
        headers: await authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ weekStart, weekEnd }),
      });
      setPayrollResult(await res.json());
    } catch (e: any) { setPayrollResult({ error: e.message }); }
    setPayrollLoading(false);
  }

  function printPayrollSlip() {
    const slip = document.getElementById("payroll-slip");
    if (!slip) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <html><head><title>Payroll Slip — Hollywood ATL</title>
      <style>
        body { margin: 0; background: #000; display: flex; justify-content: center; padding: 40px; }
        * { box-sizing: border-box; }
      </style></head>
      <body>${slip.outerHTML}</body></html>
    `);
    w.document.close();
    w.print();
  }

  // ── Weekly Report ────────────────────────────────────────────
  const [repStart, setRepStart] = useState(fmt(monday));
  const [repEnd, setRepEnd] = useState(fmt(sunday));
  const [reportResult, setReportResult] = useState<any>(null);
  const [reportLoading, setReportLoading] = useState(false);

  async function getWeeklyReport() {
    setReportLoading(true);
    try {
      const res = await fetch(`${BASE}/reports/weekly?weekStart=${repStart}&weekEnd=${repEnd}`, {
        headers: await authHeaders(),
      });
      setReportResult(await res.json());
    } catch (e: any) { setReportResult({ error: e.message }); }
    setReportLoading(false);
  }

  function downloadReport() {
    if (!reportResult) return;
    const blob = new Blob([JSON.stringify(reportResult, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hollywood-atl-report-${repStart}-to-${repEnd}.json`;
    a.click();
  }

  const inputStyle = {
    background: "#090918", border: "1px solid #333", borderRadius: 6,
    padding: "8px 12px", color: "#fff", fontSize: 13,
  };

  return (
    <Shell>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Operations</h1>
        <p style={{ color: "#666", fontSize: 13 }}>Import POS data, generate payroll, and run weekly reports</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

        {/* ── Import POS Data ── */}
        <ActionCard title="Import POS Data" description="Upload a Toast or Square CSV export to log sales data" icon="📥">
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <input type="file" accept=".csv" onChange={e => setPosFile(e.target.files?.[0] || null)}
              style={{ ...inputStyle, padding: "6px 10px", cursor: "pointer" }} />
            <Btn label={posLoading ? "Importing..." : "Import POS Data"} onClick={importPOS} disabled={!posFile || posLoading} />
          </div>
          {posFile && <p style={{ color: "#888", fontSize: 12, marginTop: 8 }}>Selected: {posFile.name}</p>}
          <ErrorResult data={posResult} />
          {posResult && !posResult.error && (
            <div style={{ marginTop: 12, padding: 12, background: "#4CAF5011", border: "1px solid #4CAF50", borderRadius: 6, color: "#4CAF50", fontSize: 13 }}>
              ✓ Imported successfully — {posResult.rows || posResult.imported || ""} records processed
            </div>
          )}
        </ActionCard>

        {/* ── Generate Payroll ── */}
        <ActionCard title="Generate Payroll" description="Initialize payroll records for all active employees for a given week" icon="💰">
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ color: "#888", fontSize: 11 }}>Week Start</label>
              <input type="date" value={weekStart} onChange={e => setWeekStart(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ color: "#888", fontSize: 11 }}>Week End</label>
              <input type="date" value={weekEnd} onChange={e => setWeekEnd(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ marginTop: 16 }}>
              <Btn label={payrollLoading ? "Generating..." : "Generate Payroll"} onClick={generatePayroll} disabled={payrollLoading} />
            </div>
          </div>
          <ErrorResult data={payrollResult} />
          <PayrollSlip data={payrollResult} onPrint={printPayrollSlip} />
        </ActionCard>

        {/* ── Weekly Report ── */}
        <ActionCard title="Weekly Report" description="Generate a full financial summary for any week" icon="📊">
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ color: "#888", fontSize: 11 }}>Week Start</label>
              <input type="date" value={repStart} onChange={e => setRepStart(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ color: "#888", fontSize: 11 }}>Week End</label>
              <input type="date" value={repEnd} onChange={e => setRepEnd(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <Btn label={reportLoading ? "Loading..." : "Weekly Report"} onClick={getWeeklyReport} disabled={reportLoading} />
              {reportResult && !reportResult.error && (
                <Btn label="Download Report" color="#2196F3" textColor="#fff" onClick={downloadReport} />
              )}
            </div>
          </div>
          <ErrorResult data={reportResult} />
          {reportResult && !reportResult.error && (
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[
                { label: "Total Revenue", value: `$${reportResult.summary.totalRevenue.toLocaleString()}`, color: "#4CAF50" },
                { label: "Total Expenses", value: `$${reportResult.summary.totalExpenses.toLocaleString()}`, color: "#F44336" },
                { label: "Net Profit", value: `$${reportResult.summary.netProfit.toLocaleString()}`, color: "#8B5CF6" },
                { label: "Labor Ratio", value: reportResult.summary.laborToRevenueRatio, color: "#2196F3" },
                { label: "Total Payroll", value: `$${reportResult.summary.totalPayroll.toLocaleString()}`, color: "#fff" },
                { label: "Total Tips", value: `$${reportResult.summary.totalTips.toLocaleString()}`, color: "#fff" },
                { label: "Service Charges", value: `$${reportResult.summary.totalServiceCharges.toLocaleString()}`, color: "#fff" },
                { label: "Commissions", value: `$${reportResult.summary.totalCommissions.toLocaleString()}`, color: "#fff" },
              ].map(s => (
                <div key={s.label} style={{ background: "#090918", borderRadius: 6, padding: 12 }}>
                  <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: s.color, fontWeight: "bold", fontSize: 18 }}>{s.value}</div>
                </div>
              ))}
            </div>
          )}
        </ActionCard>

      </div>
    </Shell>
  );
}
