import Shell from "@/components/Shell";
import { serverGet as get } from "@/lib/serverApi";

export default async function InventoryPage() {
  let items: any[] = [];
  try { items = await get("/inventory"); } catch {}

  const totalValue = items.reduce((s, i) => s + parseFloat(i.TotalValue || 0), 0);
  const lowStock = items.filter(i => i.LowStock).length;

  const categoryColor: Record<string, string> = {
    Spirits: "#8B5CF6", Beer: "#FFC107", Wine: "#9C27B0",
    Mixers: "#2196F3", Supplies: "#888", Food: "#4CAF50",
  };

  return (
    <Shell>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Inventory</h1>
        <p style={{ color: "#666", fontSize: 13 }}>{items.length} items · {lowStock > 0 ? `⚠ ${lowStock} low stock` : "All stock OK"}</p>
      </div>

      {/* Summary */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Items", value: String(items.length), color: "#fff" },
          { label: "Total Inventory Value", value: `$${totalValue.toLocaleString()}`, color: "#8B5CF6" },
          { label: "Low Stock Alerts", value: String(lowStock), color: lowStock > 0 ? "#F44336" : "#4CAF50" },
        ].map(c => (
          <div key={c.label} style={{ flex: 1, background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, padding: "20px 24px" }}>
            <div style={{ color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{c.label}</div>
            <div style={{ color: c.color, fontSize: 28, fontWeight: "bold" }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
              {["Item", "Category", "Unit", "Qty On Hand", "Reorder Level", "Cost/Unit", "Total Value", "Last Updated", ""].map(h => (
                <th key={h} style={{ padding: "13px 16px", textAlign: "left", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={9} style={{ padding: 32, textAlign: "center", color: "#555" }}>No inventory items yet</td></tr>
            ) : items.map((item: any) => (
              <tr key={item.ItemID} style={{ borderBottom: "1px solid #1e1e1e", background: item.LowStock ? "#F4433608" : "transparent" }}>
                <td style={{ padding: "12px 16px", color: "#fff", fontWeight: "bold" }}>{item.ItemName}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: "bold",
                    background: `${categoryColor[item.Category] || "#888"}22`,
                    color: categoryColor[item.Category] || "#888" }}>{item.Category}</span>
                </td>
                <td style={{ padding: "12px 16px", color: "#aaa", fontSize: 13 }}>{item.Unit}</td>
                <td style={{ padding: "12px 16px", color: item.LowStock ? "#F44336" : "#4CAF50", fontWeight: "bold" }}>
                  {item.QuantityOnHand} {item.LowStock && "⚠"}
                </td>
                <td style={{ padding: "12px 16px", color: "#aaa" }}>{item.ReorderLevel}</td>
                <td style={{ padding: "12px 16px", color: "#aaa" }}>${parseFloat(item.CostPerUnit || 0).toFixed(2)}</td>
                <td style={{ padding: "12px 16px", color: "#8B5CF6", fontWeight: "bold" }}>${parseFloat(item.TotalValue || 0).toLocaleString()}</td>
                <td style={{ padding: "12px 16px", color: "#666", fontSize: 12 }}>{item.LastUpdated}</td>
                <td style={{ padding: "12px 16px" }}>
                  {item.LowStock && <span style={{ color: "#F44336", fontSize: 11, fontWeight: "bold" }}>REORDER</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
