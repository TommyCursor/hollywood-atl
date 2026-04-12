"use client";
import { useEffect } from "react";

export default function Modal({ title, onClose, children }: {
  title: string; onClose: () => void; children: React.ReactNode;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "#000000aa",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0D0D22", border: "1px solid #2a2a2a", borderRadius: 12,
        padding: 28, width: "100%", maxWidth: 520, maxHeight: "90vh",
        overflowY: "auto", position: "relative",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>{title}</h2>
          <button onClick={onClose} style={{
            background: "transparent", border: "none", color: "#666",
            fontSize: 20, cursor: "pointer", lineHeight: 1,
          }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
