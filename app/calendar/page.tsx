"use client";
import Shell from "@/components/Shell";
import { EVENTS, PROMOTERS } from "@/lib/data";
import { useState, useMemo } from "react";

// Assign a distinct color to each promoter
const PROMOTER_COLORS: Record<string, string> = {
  James:  "#8B5CF6",
  Tim:    "#3B82F6",
  Kelly:  "#4CAF50",
  Lamont: "#F59E0B",
  Rob:    "#EC4899",
  John:   "#14B8A6",
};
const NO_PROMOTER_COLOR = "#444";

const STATUS_COLOR: Record<string, string> = {
  Completed: "#555",
  Active:    "#4CAF50",
  Upcoming:  "#3B82F6",
};

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0=Sun
}

export default function CalendarPage() {
  // Seed: March 2026
  const [year,  setYear]  = useState(2026);
  const [month, setMonth] = useState(2); // 0-indexed → March
  const [selected, setSelected] = useState<string | null>(null); // selected date ISO

  const daysInMonth  = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfMonth(year, month);

  // Map events by date
  const eventsByDate = useMemo(() => {
    const map: Record<string, typeof EVENTS> = {};
    for (const ev of EVENTS) {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    }
    return map;
  }, []);

  function isoDate(d: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
    setSelected(null);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
    setSelected(null);
  }

  // Promoters who have events this month
  const activePromoters = useMemo(() => {
    const names = new Set<string>();
    for (const ev of EVENTS) {
      if (ev.promoterName && ev.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)) {
        names.add(ev.promoterName);
      }
    }
    return Array.from(names);
  }, [year, month]);

  // Selected day detail
  const selectedEvents = selected ? (eventsByDate[selected] || []) : [];

  // Build calendar grid: leading blanks + day cells
  const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array(totalCells - firstDayOfWeek - daysInMonth).fill(null),
  ];

  const today = "2026-03-06"; // seed today

  return (
    <Shell>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Calendar</h1>
          <p style={{ color: "#666", fontSize: 13 }}>Monthly event schedule · Promoter assignments</p>
        </div>

        {/* Month navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={prevMonth} style={{ background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 6, color: "#8B5CF6", fontSize: 16, width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: 18, minWidth: 160, textAlign: "center" }}>
            {MONTH_NAMES[month]} {year}
          </span>
          <button onClick={nextMonth} style={{ background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 6, color: "#8B5CF6", fontSize: 16, width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        </div>
      </div>

      {/* Promoter legend */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: "12px 18px", marginBottom: 16, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, fontWeight: "bold" }}>Promoters</span>
        {PROMOTERS.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: PROMOTER_COLORS[p.name] || NO_PROMOTER_COLOR }} />
            <span style={{ color: PROMOTER_COLORS[p.name] || "#888", fontSize: 12, fontWeight: "bold" }}>{p.name}</span>
            {p.dealType !== "TBD" && (
              <span style={{ color: "#444", fontSize: 10 }}>{p.dealType}</span>
            )}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: NO_PROMOTER_COLOR }} />
          <span style={{ color: "#555", fontSize: 12 }}>No Promoter</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedEvents.length > 0 ? "1fr 320px" : "1fr", gap: 16, alignItems: "start" }}>
        {/* Calendar grid */}
        <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
          {/* Day header row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid #2a2a2a" }}>
            {DAY_LABELS.map(d => (
              <div key={d} style={{ padding: "10px 0", textAlign: "center", color: "#555", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 0.8 }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {cells.map((day, idx) => {
              const iso = day ? isoDate(day) : null;
              const dayEvents = iso ? (eventsByDate[iso] || []) : [];
              const isToday = iso === today;
              const isSelected = iso === selected;
              const isCurrentMonth = day !== null;

              return (
                <div
                  key={idx}
                  onClick={() => iso && setSelected(isSelected ? null : iso)}
                  style={{
                    minHeight: 90,
                    borderRight: (idx + 1) % 7 === 0 ? "none" : "1px solid #1a1a1a",
                    borderBottom: idx < cells.length - 7 ? "1px solid #1a1a1a" : "none",
                    padding: "8px 8px 6px",
                    background: isSelected ? "#8B5CF610" : "transparent",
                    cursor: isCurrentMonth ? "pointer" : "default",
                    transition: "background 0.1s",
                    position: "relative",
                  }}
                >
                  {/* Day number */}
                  {day && (
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: isToday ? "#8B5CF6" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 6,
                    }}>
                      <span style={{ color: isToday ? "#fff" : isCurrentMonth ? "#aaa" : "#333", fontSize: 12, fontWeight: isToday ? "bold" : 400 }}>
                        {day}
                      </span>
                    </div>
                  )}

                  {/* Events on this day */}
                  {dayEvents.map(ev => {
                    const color = ev.promoterName ? (PROMOTER_COLORS[ev.promoterName] || NO_PROMOTER_COLOR) : NO_PROMOTER_COLOR;
                    return (
                      <div key={ev.id} style={{
                        background: `${color}22`,
                        border: `1px solid ${color}44`,
                        borderLeft: `3px solid ${color}`,
                        borderRadius: 4,
                        padding: "3px 6px",
                        marginBottom: 4,
                      }}>
                        <div style={{ color: color, fontSize: 11, fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {ev.theme || "Open Night"}
                        </div>
                        {ev.promoterName && (
                          <div style={{ color: "#888", fontSize: 10 }}>{ev.promoterName}</div>
                        )}
                        {ev.startTime && (
                          <div style={{ color: "#555", fontSize: 9 }}>{ev.startTime}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Day detail panel */}
        {selected && (
          <div style={{ background: "#0D0D22", border: "1px solid #8B5CF633", borderRadius: 10, padding: 20, position: "sticky", top: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                  {new Date(selected + "T12:00:00").toLocaleDateString("en-US", { weekday: "long" })}
                </div>
                <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                  {new Date(selected + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "transparent", border: "none", color: "#555", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>

            {selectedEvents.length === 0 ? (
              <div style={{ color: "#444", fontSize: 13, textAlign: "center", padding: "24px 0" }}>No events scheduled</div>
            ) : selectedEvents.map(ev => {
              const color = ev.promoterName ? (PROMOTER_COLORS[ev.promoterName] || NO_PROMOTER_COLOR) : NO_PROMOTER_COLOR;
              return (
                <div key={ev.id} style={{ borderLeft: `3px solid ${color}`, paddingLeft: 14, marginBottom: 20 }}>
                  <div style={{ color: "#fff", fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>
                    {ev.theme || "Open Night"}
                  </div>

                  {/* Status badge */}
                  <span style={{ background: `${STATUS_COLOR[ev.status]}22`, color: STATUS_COLOR[ev.status], border: `1px solid ${STATUS_COLOR[ev.status]}44`, borderRadius: 4, fontSize: 10, fontWeight: "bold", padding: "2px 8px", textTransform: "uppercase", letterSpacing: 0.8 }}>
                    {ev.status}
                  </span>

                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                    {ev.startTime && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#555", fontSize: 12 }}>Time</span>
                        <span style={{ color: "#ccc", fontSize: 12 }}>{ev.startTime}{ev.endTime ? ` → ${ev.endTime}` : ""}</span>
                      </div>
                    )}

                    {/* Promoter */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#555", fontSize: 12 }}>Promoter</span>
                      {ev.promoterName ? (
                        <span style={{ color, fontWeight: "bold", fontSize: 12 }}>{ev.promoterName}</span>
                      ) : (
                        <span style={{ color: "#444", fontSize: 12 }}>—</span>
                      )}
                    </div>

                    {/* Deal */}
                    {ev.deals && (
                      <div style={{ marginTop: 4, background: "#090918", borderRadius: 6, padding: "8px 10px" }}>
                        <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Deal</div>
                        <div style={{ color: "#888", fontSize: 12 }}>{ev.deals}</div>
                      </div>
                    )}

                    {/* Revenue breakdown */}
                    {ev.revenue.total > 0 && (
                      <div style={{ marginTop: 8, background: "#090918", borderRadius: 6, padding: "10px 12px" }}>
                        <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Sales</div>
                        {[
                          { label: "Door",   value: ev.revenue.door,   color: "#2196F3" },
                          { label: "Bar",    value: ev.revenue.bar,    color: "#8B5CF6" },
                          { label: "Food",   value: ev.revenue.food,   color: "#4CAF50" },
                          { label: "Hookah", value: ev.revenue.hookah, color: "#A855F7" },
                        ].filter(r => r.value > 0).map(r => (
                          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ color: "#555", fontSize: 12 }}>{r.label}</span>
                            <span style={{ color: r.color, fontWeight: "bold", fontSize: 12 }}>${r.value.toLocaleString()}</span>
                          </div>
                        ))}
                        <div style={{ borderTop: "1px solid #1e1e1e", marginTop: 6, paddingTop: 6, display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#888", fontSize: 13, fontWeight: "bold" }}>Total</span>
                          <span style={{ color: "#4CAF50", fontSize: 14, fontWeight: "bold" }}>${ev.revenue.total.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Month stats bar */}
      <div style={{ marginTop: 16, background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: "14px 20px", display: "flex", gap: 32, flexWrap: "wrap" }}>
        {[
          { label: "Events This Month", value: String(EVENTS.length), color: "#8B5CF6" },
          { label: "With Promoter",     value: String(EVENTS.filter(e => e.promoterName).length), color: "#3B82F6" },
          { label: "Total Sales",       value: "$" + EVENTS.reduce((s, e) => s + e.revenue.total, 0).toLocaleString(), color: "#4CAF50" },
          { label: "Door Sales",        value: "$" + EVENTS.reduce((s, e) => s + e.revenue.door, 0).toLocaleString(), color: "#2196F3" },
          { label: "Bar Sales",         value: "$" + EVENTS.reduce((s, e) => s + e.revenue.bar, 0).toLocaleString(), color: "#8B5CF6" },
          { label: "Food Sales",        value: "$" + EVENTS.reduce((s, e) => s + e.revenue.food, 0).toFixed(2), color: "#4CAF50" },
          { label: "Hookah Sales",      value: "$" + EVENTS.reduce((s, e) => s + e.revenue.hookah, 0).toLocaleString(), color: "#A855F7" },
        ].map(s => (
          <div key={s.label}>
            <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{s.label}</div>
            <div style={{ color: s.color, fontWeight: "bold", fontSize: 16 }}>{s.value}</div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
