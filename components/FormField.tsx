"use client";

type Option = { value: string; label: string };

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", background: "#090918", border: "1px solid #333",
  borderRadius: 6, padding: "10px 12px", color: "#fff", fontSize: 14,
  outline: "none", boxSizing: "border-box" as const,
};

export function Input({ name, type = "text", value, onChange, placeholder, required }: {
  name: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <input
      name={name} type={type} value={value} placeholder={placeholder}
      required={required} onChange={e => onChange(e.target.value)}
      style={inputStyle}
    />
  );
}

export function Select({ name, value, onChange, options, required }: {
  name: string; value: string; onChange: (v: string) => void;
  options: Option[]; required?: boolean;
}) {
  return (
    <select
      name={name} value={value} required={required}
      onChange={e => onChange(e.target.value)}
      style={{ ...inputStyle, cursor: "pointer" }}
    >
      <option value="">Select...</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>{children}</div>;
}

export function SubmitBtn({ label, loading }: { label: string; loading: boolean }) {
  return (
    <button type="submit" disabled={loading} style={{
      width: "100%", background: loading ? "#555" : "#8B5CF6",
      color: loading ? "#999" : "#000", border: "none", borderRadius: 6,
      padding: "12px", fontWeight: "bold", fontSize: 14,
      cursor: loading ? "not-allowed" : "pointer", marginTop: 8,
    }}>
      {loading ? "Saving..." : label}
    </button>
  );
}
