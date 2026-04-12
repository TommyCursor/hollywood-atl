"use client";
import Shell from "@/components/Shell";
import { useState } from "react";
import { FINANCIAL_MONTHLY, FINANCIAL_WEEKLY, EVENTS, EMPLOYEES, DISTRIBUTIONS, EXPENSES, PARTNERS } from "@/lib/data";

// Generate week options: 8 weeks back + current + 4 weeks ahead
function getWeekOptions() {
  const weeks = [];
  const base = new Date("2026-03-02"); // seed data week start
  for (let i = -8; i <= 4; i++) {
    const start = new Date(base);
    start.setDate(base.getDate() + i * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    weeks.push({
      value: i,
      label: i === 0 ? `Mar 2–8 (Current)` : `${fmt(start)} – ${fmt(end)}`,
      isCurrent: i === 0,
      isFuture: i > 0,
    });
  }
  return weeks;
}

const WEEK_OPTIONS = getWeekOptions();

const ALL_WIDGETS = [
  { id: "stats1",        label: "Monthly Stats" },
  { id: "stats2",        label: "Weekly Stats" },
  { id: "revenue",       label: "Sales Breakdown" },
  { id: "events",        label: "Upcoming Events" },
  { id: "profit",        label: "Partner Profit Sharing" },
  { id: "distributions", label: "Outstanding Distributions" },
  { id: "expenses",      label: "Top Expenses" },
];

function Stat({ label, value, sub, color = "#8B5CF6" }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: "18px 22px", flex: 1 }}>
      <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>{label}</div>
      <div style={{ color, fontSize: 26, fontWeight: "bold" }}>{value}</div>
      {sub && <div style={{ color: "#555", fontSize: 11, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Card({ title, children, onRemove }: { title: string; children: React.ReactNode; onRemove?: () => void }) {
  return (
    <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, padding: 20, position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ color: "#8B5CF6", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2 }}>{title}</div>
        {onRemove && (
          <button onClick={onRemove} title="Remove widget" style={{
            background: "transparent", border: "none", color: "#444", fontSize: 16,
            cursor: "pointer", lineHeight: 1, padding: "0 4px",
          }}>×</button>
        )}
      </div>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [showCustomize, setShowCustomize] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState<Set<string>>(
    new Set(ALL_WIDGETS.map(w => w.id))
  );

  const monthly = FINANCIAL_MONTHLY[0];
  const weekly = FINANCIAL_WEEKLY[0];
  const upcoming = EVENTS.filter(e => e.status === "Upcoming");
  const outstanding = DISTRIBUTIONS.filter(d => d.status === "Outstanding");
  const totalOutstanding = outstanding.reduce((s, d) => s + d.balance, 0);
  const totalMonthlyExp = EXPENSES.reduce((s, e) => s + e.amount, 0);

  const currentWeekOption = WEEK_OPTIONS.find(w => w.value === selectedWeek)!;

  function toggleWidget(id: string) {
    setVisibleWidgets(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function show(id: string) { return visibleWidgets.has(id); }

  return (
    <Shell>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Owner Dashboard</h1>
          <p style={{ color: "#666", fontSize: 13 }}>March 2026 · Hollywood ATL, 257 Trinity Ave SW, ATL</p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
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
                  {w.isFuture ? "↑ " : w.isCurrent ? "● " : "↓ "}{w.label}
                </option>
              ))}
            </select>
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#8B5CF6", pointerEvents: "none", fontSize: 10 }}>▼</span>
          </div>

          {/* Customize button */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowCustomize(v => !v)}
              style={{
                background: showCustomize ? "#8B5CF620" : "#0D0D22",
                border: "1px solid #8B5CF644", borderRadius: 7, color: "#8B5CF6",
                fontSize: 12, fontWeight: "bold", padding: "8px 14px", cursor: "pointer",
              }}
            >
              ⚙ Customize
            </button>

            {showCustomize && (
              <div style={{
                position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 50,
                background: "#0D0D22", border: "1px solid #8B5CF644", borderRadius: 10,
                padding: "12px 16px", minWidth: 220, boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}>
                <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Show / Hide Widgets</div>
                {ALL_WIDGETS.map(w => (
                  <label key={w.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={visibleWidgets.has(w.id)}
                      onChange={() => toggleWidget(w.id)}
                      style={{ accentColor: "#8B5CF6", width: 14, height: 14 }}
                    />
                    <span style={{ color: "#ccc", fontSize: 13 }}>{w.label}</span>
                  </label>
                ))}
                <button
                  onClick={() => setVisibleWidgets(new Set(ALL_WIDGETS.map(w => w.id)))}
                  style={{ marginTop: 10, width: "100%", background: "#8B5CF620", border: "1px solid #8B5CF644", borderRadius: 6, color: "#8B5CF6", fontSize: 11, padding: "6px", cursor: "pointer" }}
                >
                  Reset to Default
                </button>
              </div>
            )}
          </div>

          {/* Week net badge */}
          <div style={{ background: "#8B5CF615", border: "1px solid #8B5CF644", borderRadius: 7, padding: "8px 16px", textAlign: "right" }}>
            <div style={{ color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>
              {currentWeekOption.isFuture ? "Projected" : "Actual"} · {currentWeekOption.label}
            </div>
            <div style={{ color: currentWeekOption.isFuture ? "#60A5FA" : "#8B5CF6", fontSize: 14, fontWeight: "bold" }}>
              Net ${weekly.netProfit.toLocaleString()}{currentWeekOption.isFuture ? " est." : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Stats row 1 */}
      {show("stats1") && (
        <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
          <Stat label="Monthly Sales"  value={"$" + monthly.totalIncome.toLocaleString()}   sub="Mar 2026 total income"   color="#4CAF50" />
          <Stat label="Monthly Expenses" value={"$" + monthly.totalExpenses.toLocaleString()} sub="All costs incl. labor"   color="#F44336" />
          <Stat label="Net Profit"       value={"$" + monthly.netProfit.toLocaleString()}     sub={(monthly.netProfit / monthly.totalIncome * 100).toFixed(1) + "% margin"} color="#8B5CF6" />
          <Stat label="Tax Collected"    value={"$" + monthly.totalTax.toLocaleString()}      sub="Georgia sales tax"       color="#FF9800" />
        </div>
      )}

      {/* Stats row 2 */}
      {show("stats2") && (
        <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
          <Stat label="Weekly Labor"        value={"$" + weekly.laborCost.toLocaleString()}    sub="BOH staff week of Mar 2"           color="#2196F3" />
          <Stat label="Outstanding Pay"     value={"$" + totalOutstanding.toLocaleString()}    sub={outstanding.length + " employees unpaid"} color="#F44336" />
          <Stat label="Monthly Fixed Costs" value={"$" + totalMonthlyExp.toLocaleString()}     sub="Rent, utilities, vendors"         color="#FF9800" />
          <Stat label="Active Employees"    value={String(EMPLOYEES.filter(e => e.status === "Active").length)} sub={EMPLOYEES.length + " total staff"} color="#4CAF50" />
        </div>
      )}

      {/* Cards row 1 */}
      {(show("revenue") || show("events") || show("profit")) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
          {show("revenue") && (
            <Card title="Sales Breakdown — March" onRemove={() => toggleWidget("revenue")}>
              {[
                { label: "Bar Sales",    value: monthly.barRevenue,    color: "#8B5CF6" },
                { label: "Food Sales",   value: monthly.foodRevenue,   color: "#4CAF50" },
                { label: "Door / Cover", value: monthly.doorRevenue,   color: "#2196F3" },
                { label: "Hookah",       value: monthly.hookahRevenue, color: "#A855F7" },
                { label: "Cash on Hand", value: monthly.cashRevenue,   color: "#FF9800" },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 11 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                    <span style={{ color: "#aaa", fontSize: 13 }}>{r.label}</span>
                  </div>
                  <span style={{ color: r.color, fontWeight: "bold", fontSize: 14 }}>{"$" + r.value.toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #222", paddingTop: 10, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#888", fontSize: 12 }}>Total Income</span>
                <span style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{"$" + monthly.totalIncome.toLocaleString()}</span>
              </div>
            </Card>
          )}

          {show("events") && (
            <Card title={"Upcoming Events — " + upcoming.length + " Scheduled"} onRemove={() => toggleWidget("events")}>
              {upcoming.length === 0
                ? <p style={{ color: "#555", fontSize: 13 }}>No upcoming events</p>
                : upcoming.map(e => (
                  <div key={e.id} style={{ borderBottom: "1px solid #1e1e1e", paddingBottom: 10, marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>{e.theme || "Open Night"}</div>
                        <div style={{ color: "#666", fontSize: 11, marginTop: 2 }}>{e.date} · {e.startTime || "TBD"}</div>
                        {e.promoterName && <div style={{ color: "#8B5CF6", fontSize: 11, marginTop: 2 }}>Promoter: {e.promoterName}</div>}
                      </div>
                      {e.revenue.total > 0 && (
                        <span style={{ color: "#4CAF50", fontSize: 12, fontWeight: "bold", marginLeft: 8, flexShrink: 0 }}>
                          {"$" + e.revenue.total.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              }
            </Card>
          )}

          {show("profit") && (
            <Card title="Partner Profit Sharing — March" onRemove={() => toggleWidget("profit")}>
              <div style={{ marginBottom: 14 }}>
                <span style={{ color: "#666", fontSize: 12 }}>Net profit: </span>
                <span style={{ color: "#8B5CF6", fontWeight: "bold", fontSize: 14 }}>{"$" + monthly.netProfit.toLocaleString()}</span>
              </div>
              {PARTNERS.map(p => (
                <div key={p.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ color: "#ccc", fontSize: 13 }}>{p.name}</span>
                    <span style={{ color: "#8B5CF6", fontWeight: "bold" }}>{"$" + p.netProfitShare.toLocaleString()}</span>
                  </div>
                  <div style={{ height: 5, background: "#16163A", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: (p.pct * 100) + "%", height: "100%", background: "linear-gradient(90deg, #8B5CF6, #3B82F6)", borderRadius: 3 }} />
                  </div>
                  <div style={{ color: "#555", fontSize: 10, marginTop: 3 }}>{(p.pct * 100).toFixed(0)}% ownership share</div>
                </div>
              ))}
            </Card>
          )}
        </div>
      )}

      {/* Cards row 2 */}
      {(show("distributions") || show("expenses")) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {show("distributions") && (
            <Card title={"Outstanding Distributions — $" + totalOutstanding.toLocaleString() + " owed"} onRemove={() => toggleWidget("distributions")}>
              {outstanding.length === 0
                ? <p style={{ color: "#555", fontSize: 13 }}>All accounts settled</p>
                : outstanding.map(d => (
                  <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e1e1e", paddingBottom: 8, marginBottom: 8 }}>
                    <div>
                      <span style={{ color: "#fff", fontSize: 13 }}>{d.name}</span>
                      {d.date && <span style={{ color: "#555", fontSize: 11, marginLeft: 8 }}>{d.date}</span>}
                    </div>
                    <span style={{ color: "#F44336", fontWeight: "bold" }}>{"$" + d.balance.toLocaleString()}</span>
                  </div>
                ))
              }
            </Card>
          )}

          {show("expenses") && (
            <Card title={"Top Monthly Expenses — $" + totalMonthlyExp.toLocaleString() + " total"} onRemove={() => toggleWidget("expenses")}>
              {EXPENSES.filter(e => e.amount > 0).sort((a, b) => b.amount - a.amount).slice(0, 8).map(e => (
                <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e1e1e", paddingBottom: 8, marginBottom: 8 }}>
                  <div>
                    <span style={{ color: "#ccc", fontSize: 13 }}>{e.vendor}</span>
                    {e.dueDesc && <span style={{ color: "#444", fontSize: 10, marginLeft: 8 }}>{e.dueDesc}</span>}
                  </div>
                  <span style={{ color: "#F44336", fontWeight: "bold" }}>{"$" + e.amount.toLocaleString()}</span>
                </div>
              ))}
            </Card>
          )}
        </div>
      )}

      {/* Empty state when all widgets hidden */}
      {visibleWidgets.size === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#555" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
          <div style={{ fontSize: 16, marginBottom: 8, color: "#666" }}>All widgets hidden</div>
          <button
            onClick={() => setVisibleWidgets(new Set(ALL_WIDGETS.map(w => w.id)))}
            style={{ background: "#8B5CF6", color: "#000", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: "bold", cursor: "pointer", marginTop: 8 }}
          >
            Restore All Widgets
          </button>
        </div>
      )}
    </Shell>
  );
}
