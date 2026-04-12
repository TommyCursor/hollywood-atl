"use client";
import Shell from "@/components/Shell";
import { CAKE_POS_SAMPLE } from "@/lib/data";
import { useState, useMemo } from "react";

const CAT_META: Record<string, { color: string; maps: string }> = {
  "All Drinks": { color: "#8B5CF6", maps: "sales_bar" },
  "Food":       { color: "#4CAF50", maps: "sales_food" },
  "Other":      { color: "#A855F7", maps: "sales_hookah (manual)" },
};

const CATEGORIES = ["All Drinks", "Food", "Other"];

function fmt(n: number) { return n.toFixed(2); }
function fmtDisc(n: number) { return n > 0 ? `-$${fmt(n)}` : "-"; }
function fmtSales(n: number) { return `$${fmt(n)}`; }

export default function POSImportPage() {
  const items = CAKE_POS_SAMPLE.items;
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(cat: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }

  // Aggregate per category
  const catData = useMemo(() => CATEGORIES.map(cat => {
    const rows = items.filter(i => i.category === cat);
    // sort sub-items by totalSales desc
    const sorted = [...rows].sort((a, b) => b.totalSales - a.totalSales);
    return {
      cat,
      qty:        rows.reduce((s, i) => s + i.qty, 0),
      discount:   rows.reduce((s, i) => s + i.discount, 0),
      totalSales: rows.reduce((s, i) => s + i.totalSales, 0),
      items: sorted,
    };
  }), [items]);

  const grandQty   = catData.reduce((s, c) => s + c.qty, 0);
  const grandDisc  = catData.reduce((s, c) => s + c.discount, 0);
  const grandSales = catData.reduce((s, c) => s + c.totalSales, 0);

  const thStyle: React.CSSProperties = {
    padding: "11px 20px", color: "#555", fontSize: 11,
    textTransform: "uppercase", letterSpacing: 0.8, fontWeight: "bold",
    borderBottom: "1px solid #2a2a2a",
  };

  return (
    <Shell>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>POS Import</h1>
        <p style={{ color: "#666", fontSize: 13 }}>Cake POS · Sales Category Report</p>
      </div>

      {/* Import Action */}
      <div style={{ background: "#0D0D22", border: "1px solid #8B5CF644", borderRadius: 10, padding: 24, marginBottom: 22 }}>
        <div style={{ color: "#8B5CF6", fontSize: 13, fontWeight: "bold", marginBottom: 8 }}>Import POS Data</div>
        <div style={{ color: "#666", fontSize: 13, marginBottom: 20 }}>
          Export your Sales Category report from Cake POS back office and upload the XLSX file here.
          The system will map bar, food, and other categories to Financial Daily automatically.
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1, border: "2px dashed #333", borderRadius: 8, padding: "20px 24px", textAlign: "center", color: "#555" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
            <div style={{ fontSize: 13 }}>Drop Cake POS export here, or click to browse</div>
            <div style={{ fontSize: 11, marginTop: 6, color: "#444" }}>Accepted: .xlsx · Cake Sales Category report format</div>
          </div>
          <button style={{ background: "#8B5CF6", color: "#000", border: "none", borderRadius: 8, padding: "14px 28px", fontWeight: "bold", fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>
            Upload & Import
          </button>
        </div>
        <div style={{ marginTop: 16, background: "#090918", borderRadius: 6, padding: "10px 14px" }}>
          <div style={{ color: "#555", fontSize: 11, fontWeight: "bold", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
            Sales Mapping (Cake → Financial Daily)
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {CATEGORIES.map(k => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: CAT_META[k].color }} />
                <span style={{ color: CAT_META[k].color, fontWeight: "bold", fontSize: 12 }}>{k}</span>
                <span style={{ color: "#444", fontSize: 12 }}>→</span>
                <span style={{ color: "#666", fontSize: 12 }}>{CAT_META[k].maps}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales by Sales Category — Cake POS format */}
      <div style={{ background: "#0D0D22", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>

        {/* Report header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #2a2a2a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Sales by Sales Category</div>
            <div style={{ color: "#555", fontSize: 11, marginTop: 3 }}>
              {CAKE_POS_SAMPLE.restaurant} · {CAKE_POS_SAMPLE.startDate} → {CAKE_POS_SAMPLE.endDate}
            </div>
          </div>
          <span style={{ background: "#8B5CF622", color: "#8B5CF6", border: "1px solid #8B5CF644", borderRadius: 6, fontSize: 11, fontWeight: "bold", padding: "4px 12px" }}>
            Sales Category
          </span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#161616" }}>
              <th style={{ ...thStyle, textAlign: "left", width: "55%" }}>Name</th>
              <th style={{ ...thStyle, textAlign: "right", width: "15%" }}>Quantity (#)</th>
              <th style={{ ...thStyle, textAlign: "right", width: "15%" }}>Discount ($)</th>
              <th style={{ ...thStyle, textAlign: "right", width: "15%", color: "#8B5CF6" }}>
                Total Item Sales ($) ▼
              </th>
            </tr>
          </thead>
          <tbody>

            {/* Total Category Sales row */}
            <tr style={{ borderBottom: "2px solid #2a2a2a", background: "#111122" }}>
              <td style={{ padding: "14px 20px", color: "#fff", fontWeight: "bold", fontSize: 14 }}>
                Total Category Sales
              </td>
              <td style={{ padding: "14px 20px", color: "#fff", fontWeight: "bold", fontSize: 14, textAlign: "right" }}>
                {fmt(grandQty)}
              </td>
              <td style={{ padding: "14px 20px", color: grandDisc > 0 ? "#F44336" : "#555", fontWeight: "bold", fontSize: 14, textAlign: "right" }}>
                {fmtDisc(grandDisc)}
              </td>
              <td style={{ padding: "14px 20px", color: "#4CAF50", fontWeight: "bold", fontSize: 16, textAlign: "right" }}>
                {fmtSales(grandSales)}
              </td>
            </tr>

            {/* Category rows — expandable */}
            {catData.map(cat => {
              const isOpen = expanded.has(cat.cat);
              const color  = CAT_META[cat.cat].color;
              return (
                <>
                  {/* Category row */}
                  <tr
                    key={cat.cat}
                    onClick={() => toggle(cat.cat)}
                    style={{ borderBottom: isOpen ? "none" : "1px solid #1e1e1e", cursor: "pointer", background: isOpen ? `${color}08` : "transparent" }}
                  >
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: isOpen ? color : "#888", fontSize: 11, width: 14, display: "inline-block", transition: "transform 0.15s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
                        <span style={{ color: isOpen ? color : "#ccc", fontWeight: isOpen ? "bold" : 500, fontSize: 14 }}>{cat.cat}</span>
                        <span style={{ color: "#3a3a3a", fontSize: 11, marginLeft: 4 }}>{CAT_META[cat.cat].maps}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#aaa", fontSize: 14, textAlign: "right" }}>{fmt(cat.qty)}</td>
                    <td style={{ padding: "14px 20px", color: cat.discount > 0 ? "#F44336" : "#555", fontSize: 14, textAlign: "right" }}>{fmtDisc(cat.discount)}</td>
                    <td style={{ padding: "14px 20px", color, fontWeight: "bold", fontSize: 15, textAlign: "right" }}>{fmtSales(cat.totalSales)}</td>
                  </tr>

                  {/* Expanded item rows */}
                  {isOpen && cat.items.map((item, idx) => (
                    <tr
                      key={idx}
                      style={{ borderBottom: idx === cat.items.length - 1 ? "1px solid #2a2a2a" : "1px solid #141414", background: "#0a0a1a" }}
                    >
                      <td style={{ padding: "10px 20px 10px 52px" }}>
                        <div style={{ color: "#ccc", fontSize: 13 }}>{item.item}</div>
                        <div style={{ display: "flex", gap: 8, marginTop: 3, flexWrap: "wrap" }}>
                          {item.subCategory !== "-" && (
                            <span style={{ background: `${color}18`, color, fontSize: 10, padding: "1px 7px", borderRadius: 3 }}>{item.subCategory}</span>
                          )}
                          <span style={{ color: "#3a3a3a", fontSize: 10 }}>{item.employee}</span>
                          <span style={{ color: "#3a3a3a", fontSize: 10 }}>·</span>
                          <span style={{ color: "#3a3a3a", fontSize: 10 }}>{item.register}</span>
                          {item.zone !== "No Zone" && (
                            <>
                              <span style={{ color: "#3a3a3a", fontSize: 10 }}>·</span>
                              <span style={{ color: "#14B8A6", fontSize: 10 }}>{item.zone}</span>
                            </>
                          )}
                          {item.orderType === "Delivery" && (
                            <span style={{ background: "#F59E0B22", color: "#F59E0B", fontSize: 10, padding: "1px 7px", borderRadius: 3 }}>Delivery</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "10px 20px", color: "#888", fontSize: 13, textAlign: "right" }}>{fmt(item.qty)}</td>
                      <td style={{ padding: "10px 20px", color: item.discount > 0 ? "#F44336" : "#333", fontSize: 13, textAlign: "right" }}>{fmtDisc(item.discount)}</td>
                      <td style={{ padding: "10px 20px", color: "#4CAF50", fontSize: 14, fontWeight: "bold", textAlign: "right" }}>{fmtSales(item.totalSales)}</td>
                    </tr>
                  ))}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
