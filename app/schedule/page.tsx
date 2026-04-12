"use client";
import Shell from "@/components/Shell";
import { BOH_SCHEDULE, FOH_SCHEDULE } from "@/lib/data";
import { useState, useMemo } from "react";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_FULL  = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Seed week: Mar 2–8 2026 (Mon–Sun)
const SEED_MONDAY = new Date("2026-03-02");

function getWeekDates(startDayIndex: number, weekOffset: number): Date[] {
  // Find the most recent occurrence of startDayIndex from SEED_MONDAY + offset
  const base = new Date(SEED_MONDAY);
  base.setDate(SEED_MONDAY.getDate() + weekOffset * 7);
  // Adjust to the chosen start day
  const baseDay = base.getDay(); // 0=Sun
  let diff = startDayIndex - baseDay;
  if (diff > 3) diff -= 7;
  if (diff < -3) diff += 7;
  base.setDate(base.getDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return d;
  });
}

function fmt(d: Date) {
  return d.toISOString().slice(0, 10);
}

function fmtLabel(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getWeekLabel(dates: Date[]) {
  return `${fmtLabel(dates[0])} – ${fmtLabel(dates[6])}`;
}

function getWeekOptions(startDayIndex: number) {
  const weeks = [];
  for (let i = -8; i <= 4; i++) {
    const dates = getWeekDates(startDayIndex, i);
    weeks.push({
      value: i,
      label: i === 0 ? `${getWeekLabel(dates)} (Current)` : getWeekLabel(dates),
      isFuture: i > 0,
      dates,
    });
  }
  return weeks;
}

type ShiftCell = { start: string; end?: string; hours?: number } | null;

function buildGrid(dates: Date[]) {
  const dateStrs = dates.map(fmt);

  const boh = BOH_SCHEDULE.map(emp => ({
    name: emp.name,
    role: emp.role,
    type: "BOH" as const,
    cells: dateStrs.map(ds => {
      const s = emp.shifts.find(sh => sh.date === ds);
      if (!s || s.hours === 0) return null;
      return { start: s.start, hours: s.hours } as ShiftCell;
    }),
  }));

  const foh = FOH_SCHEDULE.map(emp => ({
    name: emp.name,
    role: emp.role,
    type: "FOH" as const,
    cells: dateStrs.map(ds => {
      const s = emp.shifts.find(sh => sh.date === ds);
      if (!s) return null;
      return { start: s.start } as ShiftCell;
    }),
  }));

  return [...boh, ...foh];
}

function exportCSV(dates: Date[], rows: ReturnType<typeof buildGrid>) {
  const headers = ["Employee", "Role", "Type", ...dates.map(d => `${DAY_NAMES[d.getDay()]} ${fmtLabel(d)}`)];
  const lines = [headers.join(",")];
  for (const row of rows) {
    const cells = row.cells.map(c => c ? `"${c.start}${c.hours ? ` (${c.hours}h)` : ""}"` : "");
    lines.push([`"${row.name}"`, `"${row.role}"`, row.type, ...cells].join(","));
  }
  const csv = lines.join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `schedule_${fmt(dates[0])}_to_${fmt(dates[6])}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function SchedulePage() {
  const [startDay,    setStartDay]    = useState(1); // 1 = Monday (payroll standard)
  const [weekOffset,  setWeekOffset]  = useState(0);

  const weekOptions = useMemo(() => getWeekOptions(startDay), [startDay]);
  const currentWeek = weekOptions.find(w => w.value === weekOffset)!;
  const dates = currentWeek.dates;
  const rows  = useMemo(() => buildGrid(dates), [dates]);

  const bohRows = rows.filter(r => r.type === "BOH");
  const fohRows = rows.filter(r => r.type === "FOH");

  const totalScheduled = rows.filter(r => r.cells.some(c => c !== null)).length;
  const totalShifts    = rows.reduce((s, r) => s + r.cells.filter(c => c !== null).length, 0);

  const selStyle: React.CSSProperties = {
    background: "#090918", border: "1px solid #2a2a2a", borderRadius: 6,
    color: "#ccc", fontSize: 13, padding: "8px 12px", cursor: "pointer", outline: "none",
  };

  const colW = 110;

  return (
    <Shell>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Schedule</h1>
          <p style={{ color: "#666", fontSize: 13 }}>BOH + FOH · {totalScheduled} staff scheduled · {totalShifts} shifts</p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {/* Payroll start day */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>Payroll Start Day</span>
            <select value={startDay} onChange={e => setStartDay(Number(e.target.value))} style={selStyle}>
              {DAY_FULL.map((d, i) => <option key={i} value={i}>{d}</option>)}
            </select>
          </div>

          {/* Week selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>Week</span>
            <div style={{ position: "relative" }}>
              <select
                value={weekOffset}
                onChange={e => setWeekOffset(Number(e.target.value))}
                style={{ ...selStyle, paddingRight: 28, minWidth: 220, appearance: "none" }}
              >
                {weekOptions.map(w => (
                  <option key={w.value} value={w.value} style={{ background: "#090918", color: w.isFuture ? "#60A5FA" : "#fff" }}>
                    {w.isFuture ? "↑ " : w.value === 0 ? "● " : "↓ "}{w.label}
                  </option>
                ))}
              </select>
              <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#8B5CF6", pointerEvents: "none", fontSize: 10 }}>▼</span>
            </div>
          </div>

          {/* Export CSV */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>Export</span>
            <button
              onClick={() => exportCSV(dates, rows)}
              style={{ background: "#4CAF5022", border: "1px solid #4CAF5044", borderRadius: 6, color: "#4CAF50", fontSize: 13, fontWeight: "bold", padding: "8px 18px", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>

      {/* Day header strip */}
      <div style={{ background: "#0D0D22", border: "1px solid #8B5CF633", borderRadius: 10, padding: "14px 18px", marginBottom: 16, overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 0, minWidth: 160 + colW * 7 }}>
          <div style={{ width: 160, flexShrink: 0, color: "#555", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
            Week of {getWeekLabel(dates)}
          </div>
          {dates.map((d, i) => {
            const isToday = fmt(d) === "2026-03-06"; // seed "today"
            const totalShiftsDay = rows.reduce((s, r) => s + (r.cells[i] ? 1 : 0), 0);
            return (
              <div key={i} style={{ width: colW, flexShrink: 0, textAlign: "center", borderLeft: "1px solid #1a1a1a", paddingLeft: 8 }}>
                <div style={{ color: isToday ? "#8B5CF6" : "#888", fontSize: 12, fontWeight: isToday ? "bold" : 400 }}>
                  {DAY_NAMES[d.getDay()]}
                </div>
                <div style={{ color: isToday ? "#fff" : "#555", fontSize: 11 }}>{fmtLabel(d)}</div>
                <div style={{ color: "#444", fontSize: 10, marginTop: 2 }}>{totalShiftsDay > 0 ? `${totalShiftsDay} shifts` : "—"}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOH Schedule */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ padding: "12px 18px", borderBottom: "1px solid #2a2a2a", background: "#090918" }}>
          <span style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2 }}>
            BOH — Back of House ({bohRows.length} staff)
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 160 + colW * 7 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e1e", background: "#161616" }}>
                <th style={{ width: 160, padding: "10px 14px", textAlign: "left", color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Employee</th>
                {dates.map((d, i) => {
                  const isToday = fmt(d) === "2026-03-06";
                  return (
                    <th key={i} style={{ width: colW, padding: "10px 8px", textAlign: "center", color: isToday ? "#8B5CF6" : "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>
                      {DAY_NAMES[d.getDay()]} {fmtLabel(d)}
                    </th>
                  );
                })}
                <th style={{ padding: "10px 14px", textAlign: "right", color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Hrs</th>
              </tr>
            </thead>
            <tbody>
              {bohRows.map((emp, ri) => {
                const totalHrs = emp.cells.reduce((s, c) => s + (c?.hours || 0), 0);
                return (
                  <tr key={ri} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ color: "#fff", fontWeight: 500, fontSize: 13 }}>{emp.name}</div>
                      <div style={{ color: "#555", fontSize: 11 }}>{emp.role}</div>
                    </td>
                    {emp.cells.map((cell, ci) => (
                      <td key={ci} style={{ padding: "8px 6px", textAlign: "center", borderLeft: "1px solid #1a1a1a" }}>
                        {cell ? (
                          <div>
                            <div style={{ color: "#4CAF50", fontSize: 11, fontWeight: "bold" }}>{cell.hours}h</div>
                            <div style={{ color: "#555", fontSize: 9, whiteSpace: "nowrap" }}>{cell.start}</div>
                          </div>
                        ) : (
                          <span style={{ color: "#1E1B4B", fontSize: 13 }}>—</span>
                        )}
                      </td>
                    ))}
                    <td style={{ padding: "10px 14px", color: "#fff", fontWeight: "bold", textAlign: "right", fontSize: 13 }}>{totalHrs}h</td>
                  </tr>
                );
              })}
              {/* BOH totals */}
              <tr style={{ borderTop: "2px solid #2a2a2a", background: "#161616" }}>
                <td style={{ padding: "10px 14px", color: "#666", fontWeight: "bold", fontSize: 11, textTransform: "uppercase" }}>Daily Totals</td>
                {dates.map((_, ci) => {
                  const count = bohRows.filter(r => r.cells[ci] !== null).length;
                  const hrs   = bohRows.reduce((s, r) => s + (r.cells[ci]?.hours || 0), 0);
                  return (
                    <td key={ci} style={{ padding: "10px 6px", textAlign: "center", borderLeft: "1px solid #1a1a1a" }}>
                      {count > 0 ? (
                        <div>
                          <div style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold" }}>{count} staff</div>
                          <div style={{ color: "#555", fontSize: 9 }}>{hrs}h total</div>
                        </div>
                      ) : <span style={{ color: "#1E1B4B" }}>—</span>}
                    </td>
                  );
                })}
                <td style={{ padding: "10px 14px", color: "#fff", fontWeight: "bold", textAlign: "right" }}>
                  {bohRows.reduce((s, r) => s + r.cells.reduce((ss, c) => ss + (c?.hours || 0), 0), 0)}h
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FOH Schedule */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "12px 18px", borderBottom: "1px solid #2a2a2a", background: "#090918" }}>
          <span style={{ color: "#3B82F6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2 }}>
            FOH — Front of House ({fohRows.length} staff)
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 160 + colW * 7 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e1e", background: "#161616" }}>
                <th style={{ width: 160, padding: "10px 14px", textAlign: "left", color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Employee</th>
                {dates.map((d, i) => {
                  const isToday = fmt(d) === "2026-03-06";
                  return (
                    <th key={i} style={{ width: colW, padding: "10px 8px", textAlign: "center", color: isToday ? "#3B82F6" : "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>
                      {DAY_NAMES[d.getDay()]} {fmtLabel(d)}
                    </th>
                  );
                })}
                <th style={{ padding: "10px 14px", textAlign: "right", color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Shifts</th>
              </tr>
            </thead>
            <tbody>
              {fohRows.map((emp, ri) => {
                const shiftCount = emp.cells.filter(c => c !== null).length;
                return (
                  <tr key={ri} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ color: "#fff", fontWeight: 500, fontSize: 13 }}>{emp.name}</div>
                      <div style={{ color: "#555", fontSize: 11 }}>{emp.role}</div>
                    </td>
                    {emp.cells.map((cell, ci) => (
                      <td key={ci} style={{ padding: "8px 6px", textAlign: "center", borderLeft: "1px solid #1a1a1a" }}>
                        {cell ? (
                          <div>
                            <div style={{ color: "#3B82F6", fontSize: 11, fontWeight: "bold" }}>On</div>
                            <div style={{ color: "#555", fontSize: 9, whiteSpace: "nowrap" }}>{cell.start}</div>
                          </div>
                        ) : (
                          <span style={{ color: "#1E1B4B", fontSize: 13 }}>—</span>
                        )}
                      </td>
                    ))}
                    <td style={{ padding: "10px 14px", color: "#3B82F6", fontWeight: "bold", textAlign: "right", fontSize: 13 }}>{shiftCount}</td>
                  </tr>
                );
              })}
              {/* FOH totals */}
              <tr style={{ borderTop: "2px solid #2a2a2a", background: "#161616" }}>
                <td style={{ padding: "10px 14px", color: "#666", fontWeight: "bold", fontSize: 11, textTransform: "uppercase" }}>Daily Totals</td>
                {dates.map((_, ci) => {
                  const count = fohRows.filter(r => r.cells[ci] !== null).length;
                  return (
                    <td key={ci} style={{ padding: "10px 6px", textAlign: "center", borderLeft: "1px solid #1a1a1a" }}>
                      {count > 0
                        ? <span style={{ color: "#3B82F6", fontSize: 11, fontWeight: "bold" }}>{count} staff</span>
                        : <span style={{ color: "#1E1B4B" }}>—</span>}
                    </td>
                  );
                })}
                <td style={{ padding: "10px 14px", color: "#3B82F6", fontWeight: "bold", textAlign: "right" }}>
                  {fohRows.reduce((s, r) => s + r.cells.filter(c => c !== null).length, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
