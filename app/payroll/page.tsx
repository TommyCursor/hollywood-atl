"use client";
import Shell from "@/components/Shell";
import { useState } from "react";
import { BOH_SCHEDULE, FOH_SCHEDULE, FINANCIAL_WEEKLY } from "@/lib/data";

function getWeekOptions() {
  const weeks = [];
  const base = new Date("2026-03-02");
  for (let i = -8; i <= 4; i++) {
    const start = new Date(base);
    start.setDate(base.getDate() + i * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    weeks.push({ value: i, label: i === 0 ? "Mar 2–8 (Current)" : `${fmt(start)} – ${fmt(end)}`, isFuture: i > 0 });
  }
  return weeks;
}

const WEEK_OPTIONS = getWeekOptions();

export default function PayrollPage() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const weekly = FINANCIAL_WEEKLY[0];
  const totalBOH = BOH_SCHEDULE.reduce((s, e) => s + e.totalPay, 0);
  const BOH_DAYS = ["2026-03-02","2026-03-03","2026-03-04","2026-03-05","2026-03-06","2026-03-07","2026-03-08"];
  const DAY_LABELS = ["Mon 3/2","Tue 3/3","Wed 3/4","Thu 3/5","Fri 3/6","Sat 3/7","Sun 3/8"];
  const currentWeek = WEEK_OPTIONS.find(w => w.value === selectedWeek)!;

  return (
    <Shell>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Payroll</h1>
          <p style={{ color: "#666", fontSize: 13 }}>BOH Schedule + FOH Roster</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Week selector */}
          <div style={{ position: "relative" }}>
            <select
              value={selectedWeek}
              onChange={e => setSelectedWeek(Number(e.target.value))}
              style={{
                background: "#0D0D22", border: "1px solid #8B5CF644", borderRadius: 7,
                color: "#8B5CF6", fontSize: 13, fontWeight: "bold", padding: "8px 32px 8px 14px",
                cursor: "pointer", appearance: "none", outline: "none", minWidth: 200,
              }}
            >
              {WEEK_OPTIONS.map(w => (
                <option key={w.value} value={w.value} style={{ background: "#0D0D22", color: w.isFuture ? "#60A5FA" : "#fff" }}>
                  {w.isFuture ? "↑ " : w.value === 0 ? "● " : "↓ "}{w.label}
                </option>
              ))}
            </select>
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#8B5CF6", pointerEvents: "none", fontSize: 10 }}>▼</span>
          </div>

          <div style={{ background: "#8B5CF615", border: "1px solid #8B5CF644", borderRadius: 7, padding: "8px 16px", textAlign: "right" }}>
            <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>
              {currentWeek.isFuture ? "Projected" : "Weekly"} Labor Cost
            </div>
            <div style={{ color: currentWeek.isFuture ? "#60A5FA" : "#8B5CF6", fontSize: 16, fontWeight: "bold" }}>
              {"$" + weekly.laborCost.toLocaleString()}{currentWeek.isFuture ? " est." : ""}
            </div>
          </div>
        </div>
      </div>

      {/* BOH Summary Cards */}
      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        {BOH_SCHEDULE.map(emp => (
          <div key={emp.employeeId} style={{ flex: 1, background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ color: "#8B5CF6", fontWeight: "bold", fontSize: 14, marginBottom: 4 }}>{emp.name}</div>
            <div style={{ color: "#888", fontSize: 11, marginBottom: 10 }}>{emp.role} · ${emp.payPerHour}/hr</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase" }}>Total Hours</div>
                <div style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>{emp.totalHours}h</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase" }}>Total Pay</div>
                <div style={{ color: "#4CAF50", fontWeight: "bold", fontSize: 16 }}>{"$" + emp.totalPay.toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ flex: 1, background: "#0D0D22", border: "1px solid #8B5CF644", borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ color: "#8B5CF6", fontWeight: "bold", fontSize: 14, marginBottom: 4 }}>BOH Total</div>
          <div style={{ color: "#888", fontSize: 11, marginBottom: 10 }}>{BOH_SCHEDULE.length} employees</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase" }}>Total Hours</div>
              <div style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>{BOH_SCHEDULE.reduce((s,e) => s+e.totalHours, 0)}h</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase" }}>Total Pay</div>
              <div style={{ color: "#4CAF50", fontWeight: "bold", fontSize: 16 }}>{"$" + totalBOH.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOH Schedule Grid */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden", marginBottom: 22 }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #2a2a2a" }}>
          <span style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2 }}>
            BOH Schedule — {currentWeek.label}
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2a2a", background: "#161616" }}>
                <th style={{ padding: "10px 14px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Employee</th>
                <th style={{ padding: "10px 14px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Role</th>
                <th style={{ padding: "10px 14px", textAlign: "center", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>$/hr</th>
                {DAY_LABELS.map(d => (
                  <th key={d} style={{ padding: "10px 10px", textAlign: "center", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{d}</th>
                ))}
                <th style={{ padding: "10px 14px", textAlign: "right", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Hrs</th>
                <th style={{ padding: "10px 14px", textAlign: "right", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Total Pay</th>
              </tr>
            </thead>
            <tbody>
              {BOH_SCHEDULE.map(emp => (
                <tr key={emp.employeeId} style={{ borderBottom: "1px solid #1e1e1e" }}>
                  <td style={{ padding: "10px 14px", color: "#fff", fontWeight: "bold" }}>{emp.name}</td>
                  <td style={{ padding: "10px 14px", color: "#888", fontSize: 12 }}>{emp.role}</td>
                  <td style={{ padding: "10px 14px", color: "#8B5CF6", textAlign: "center", fontWeight: "bold" }}>${emp.payPerHour}</td>
                  {BOH_DAYS.map(day => {
                    const shift = emp.shifts.find(s => s.date === day);
                    return (
                      <td key={day} style={{ padding: "8px 10px", textAlign: "center" }}>
                        {shift && shift.hours > 0 ? (
                          <div>
                            <div style={{ color: "#4CAF50", fontSize: 11, fontWeight: "bold" }}>{shift.hours}h</div>
                            <div style={{ color: "#555", fontSize: 9, whiteSpace: "nowrap" }}>{shift.start}</div>
                          </div>
                        ) : (
                          <span style={{ color: "#1E1B4B", fontSize: 12 }}>—</span>
                        )}
                      </td>
                    );
                  })}
                  <td style={{ padding: "10px 14px", color: "#fff", fontWeight: "bold", textAlign: "right" }}>{emp.totalHours}h</td>
                  <td style={{ padding: "10px 14px", color: "#4CAF50", fontWeight: "bold", textAlign: "right", fontSize: 14 }}>{"$" + emp.totalPay.toFixed(2)}</td>
                </tr>
              ))}
              <tr style={{ borderTop: "2px solid #2a2a2a", background: "#161616" }}>
                <td colSpan={3} style={{ padding: "12px 14px", color: "#888", fontSize: 11, fontWeight: "bold", textTransform: "uppercase" }}>TOTALS</td>
                {BOH_DAYS.map(day => {
                  const dayTotal = BOH_SCHEDULE.reduce((s, emp) => s + (emp.shifts.find(sh => sh.date === day)?.hours || 0), 0);
                  return (
                    <td key={day} style={{ padding: "12px 10px", textAlign: "center", color: dayTotal > 0 ? "#888" : "#1E1B4B", fontSize: 12, fontWeight: "bold" }}>
                      {dayTotal > 0 ? dayTotal + "h" : "—"}
                    </td>
                  );
                })}
                <td style={{ padding: "12px 14px", color: "#fff", fontWeight: "bold", textAlign: "right" }}>{BOH_SCHEDULE.reduce((s,e) => s+e.totalHours, 0)}h</td>
                <td style={{ padding: "12px 14px", color: "#4CAF50", fontWeight: "bold", textAlign: "right", fontSize: 15 }}>{"$" + totalBOH.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FOH Roster */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #2a2a2a" }}>
          <span style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2 }}>
            FOH Roster — {currentWeek.label} ({FOH_SCHEDULE.length} staff)
          </span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a", background: "#161616" }}>
              {["Employee", "Role", "Shifts This Week", "Dates Scheduled"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FOH_SCHEDULE.map((emp, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #1e1e1e" }}>
                <td style={{ padding: "10px 14px", color: "#fff", fontWeight: "bold" }}>{emp.name}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ background: "#8B5CF618", color: "#8B5CF6", padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: "bold" }}>{emp.role}</span>
                </td>
                <td style={{ padding: "10px 14px", color: "#8B5CF6", fontWeight: "bold" }}>{emp.shifts.length}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {emp.shifts.map((s, si) => (
                      <span key={si} style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 4, padding: "2px 8px", fontSize: 10, color: "#888", whiteSpace: "nowrap" }}>
                        {s.date.slice(5)} {s.start}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
